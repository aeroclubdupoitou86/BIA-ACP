import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService.ts';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Bonjour pilote ! Je suis l'AéroBot. Besoin d'une explication sur le principe d'Archimède, la navigation ou les nuages ? Je suis prêt pour le décollage !" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden animate-fade-in max-w-4xl mx-auto">
      {/* Header Cockpit */}
      <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <i className="fa-solid fa-robot text-xl"></i>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          <div>
            <h3 className="font-black text-lg tracking-tight uppercase">AéroBot Assistant</h3>
            <div className="flex items-center">
               <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse mr-2"></span>
               <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Opérationnel • Système BIA 2.0</p>
            </div>
          </div>
        </div>
        <div className="hidden sm:block px-4 py-2 bg-slate-800 rounded-xl border border-slate-700">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">AI-MODEL: GEMINI-PRO</p>
        </div>
      </div>

      {/* Zone de discussion */}
      <div 
        ref={scrollRef}
        className="flex-1 p-5 overflow-y-auto space-y-6 bg-slate-50/50"
      >
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex flex-col max-w-[90%] sm:max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div 
                className={`rounded-2xl px-5 py-3 text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed font-medium">
                  {msg.content}
                </div>
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2 px-1">
                {msg.role === 'user' ? 'Copilote' : 'AéroBot'}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 flex space-x-1.5 shadow-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Cockpit */}
      <div className="p-5 bg-white border-t border-slate-100">
        <div className="flex items-center space-x-3 bg-slate-100 rounded-2xl p-2 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:bg-white border border-transparent focus-within:border-blue-200">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Posez votre question aéronautique..."
            className="flex-1 bg-transparent border-none px-3 py-2 text-sm focus:ring-0 resize-none max-h-32 text-slate-900 font-medium"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-slate-900 disabled:bg-slate-300 transition-all shadow-lg shadow-blue-500/20 active:scale-95 shrink-0"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
        <div className="flex items-center justify-center mt-3 space-x-4">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter italic flex items-center">
            <i className="fa-solid fa-circle-info mr-1 text-blue-400"></i>
            Toujours valider avec un instructeur FI
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;