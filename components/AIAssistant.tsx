import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService.ts';
import { GoogleGenAI, Modality } from '@google/genai';
import * as audioUtils from '../services/audioUtils.ts';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Bonjour pilote ! Je suis l'AéroBot. Prêt pour une conversation vocale ?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const startLiveSession = async () => {
    try {
      setLoading(true);
      
      // Request mic permission first
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const apiKey = process.env.API_KEY || '';
      if (!apiKey) throw new Error("Clé API manquante dans l'environnement.");
      
      const ai = new GoogleGenAI({ apiKey });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: "Tu es l'assistant IA spécialisé pour le BIA. Réponds de façon concise et pédagogique par la voix.",
        },
        callbacks: {
          onopen: () => {
            setIsLive(true);
            setLoading(false);
            
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = audioUtils.createPcmBlob(inputData);
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            
            source.connect(processor);
            processor.connect(inputCtx.destination);
          },
          onmessage: async (message) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              const ctx = audioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const buffer = await audioUtils.decodeAudioData(
                audioUtils.decodeFromBase64(base64Audio),
                ctx,
                24000,
                1
              );
              
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => sourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
            
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => stopLiveSession(),
          onerror: (e) => {
            console.error("Live Error:", e);
            stopLiveSession();
          }
        }
      });
      
      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      console.error("Failed to start live session:", err);
      setLoading(false);
      let errorMsg = "Impossible d'accéder au micro.";
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMsg = "Accès au micro refusé. Veuillez autoriser le microphone dans les paramètres de votre navigateur pour ce site.";
      }
      alert(errorMsg);
    }
  };

  const stopLiveSession = () => {
    setIsLive(false);
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e) {}
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    const response = await getGeminiResponse(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto relative mb-6">
      
      {/* Mode Vocal Actif */}
      {isLive && (
        <div className="absolute inset-0 z-50 bg-slate-900/98 flex flex-col items-center justify-center text-white p-6 animate-fade-in">
          <div className="mb-8 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center btn-pulse">
            <i className="fa-solid fa-microphone text-4xl"></i>
          </div>
          <h2 className="text-xl font-black uppercase tracking-widest mb-2">AéroBot à l'écoute</h2>
          <p className="text-blue-300 text-[10px] font-bold mb-10 text-center uppercase tracking-widest">Conversation en direct...</p>
          
          <div className="flex items-end space-x-2 h-10 mb-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="voice-bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>

          <button 
            onClick={stopLiveSession}
            className="px-10 py-4 bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-red-500/20 active:scale-95"
          >
            Couper le micro
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <i className="fa-solid fa-robot"></i>
          </div>
          <div>
            <h3 className="font-black text-sm uppercase tracking-tight">AéroBot</h3>
            <span className="text-[8px] text-blue-400 font-bold uppercase tracking-widest block">Interface Pilotage</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[8px] font-black uppercase text-slate-300 tracking-widest">Système OK</span>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block px-4 py-2.5 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-500/10' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && !isLive && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 flex space-x-1">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Zone */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center space-x-2">
          {/* Bouton MICRO proéminent */}
          <button 
            onClick={startLiveSession}
            disabled={loading || isLive}
            className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20 active:scale-95 shrink-0 btn-pulse disabled:opacity-50 disabled:animate-none"
            title="Démarrer le mode vocal"
          >
            <i className="fa-solid fa-microphone text-xl"></i>
          </button>

          <div className="flex-1 flex items-center bg-slate-100 rounded-2xl p-1.5 border border-transparent focus-within:border-blue-300 focus-within:bg-white transition-all shadow-inner">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Écrivez un message..."
              className="flex-1 bg-transparent border-none px-3 py-2 text-sm focus:ring-0 resize-none max-h-32 text-slate-900"
              rows={1}
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-slate-800 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-blue-600 disabled:bg-slate-300 transition-all shrink-0"
            >
              <i className="fa-solid fa-paper-plane text-xs"></i>
            </button>
          </div>
        </div>
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center mt-3 italic">
           Cliquez sur le micro pour parler en direct avec l'expert BIA
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;