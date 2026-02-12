import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';

interface Article {
  id: string;
  title: string;
  published: string;
  publishedRaw: number;
  content: string;
  summary: string;
  link: string;
  author: string;
  image?: string;
}

const CACHE_KEY = 'bia_actus_cache';
const CACHE_EXPIRY = 30 * 60 * 1000;
const ITEMS_PER_PAGE = 6;

const Actus: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [clickingId, setClickingId] = useState<string | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          setArticles(data);
          setLoading(false);
          if (Date.now() - timestamp > 5 * 60 * 1000) {
            fetchArticles(true);
          }
          return;
        }
      } catch (e) {
        console.error("Cache parsing error", e);
      }
    }
    fetchArticles();
  }, []);

  // Gérer le bouton "Retour" du téléphone
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (selectedArticle) {
        setSelectedArticle(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedArticle]);

  const fetchWithProxy = async (url: string, signal: AbortSignal) => {
    const ts = new Date().getTime();
    const finalUrl = `${url}${url.includes('?') ? '&' : '?'}_t=${ts}`;
    
    const proxies = [
      (u: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
      (u: string) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
      (u: string) => `https://thingproxy.freeboard.io/fetch/${u}`
    ];

    for (const getProxyUrl of proxies) {
      try {
        const response = await fetch(getProxyUrl(finalUrl), { signal });
        if (response.ok) {
          const rawData = await response.json();
          if (rawData.contents) return JSON.parse(rawData.contents);
          return rawData;
        }
      } catch (e) {
        if ((e as Error).name === 'AbortError') throw e;
        console.warn("Proxy failed, trying next...");
      }
    }
    throw new Error("Tous les proxys ont échoué");
  };

  const fetchArticles = useCallback(async (isRefresh = false) => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(false);
    
    try {
      const blogUrl = `https://bia-acp.blogspot.com/feeds/posts/default?alt=json`;
      const data = await fetchWithProxy(blogUrl, controller.signal);

      const entries = data.feed.entry || [];
      const parsed: Article[] = entries.map((entry: any) => {
        const contentStr = entry.content ? entry.content.$t : (entry.summary ? entry.summary.$t : "");
        const pubDate = new Date(entry.published.$t);
        let imageUrl = null;
        const imgMatch = contentStr.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch) imageUrl = imgMatch[1];
        else if (entry.media$thumbnail) imageUrl = entry.media$thumbnail.url.replace('s72-c', 's1600');
        
        return {
          id: entry.id.$t,
          title: entry.title.$t,
          publishedRaw: pubDate.getTime(),
          published: pubDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
          content: contentStr,
          summary: contentStr.replace(/<[^>]*>?/gm, '').substring(0, 150).trim() + '...',
          link: entry.link.find((l: any) => l.rel === 'alternate')?.href || 'https://bia-acp.blogspot.com/',
          author: entry.author?.[0]?.name?.$t || 'Instructeur BIA',
          image: imageUrl
        };
      });

      parsed.sort((a, b) => b.publishedRaw - a.publishedRaw);
      setArticles(parsed);
      localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: parsed }));
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      console.error("Fetch error:", err);
      if (articles.length === 0) setError(true);
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [articles.length]);

  const displayedArticles = useMemo(() => articles.slice(0, displayCount), [articles, displayCount]);

  const handleSelectArticle = (art: Article) => {
    setClickingId(art.id);
    // Petit délai pour laisser l'animation de clic se voir sur mobile
    setTimeout(() => {
      window.history.pushState({ articleId: art.id }, '');
      setSelectedArticle(art);
      setClickingId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  };

  const handleBack = () => {
    window.history.back(); // Cela déclenchera popstate géré plus haut
  };

  if (selectedArticle) {
    return (
      <div className="animate-fade-in space-y-6 max-w-4xl mx-auto pb-10">
        <button onClick={handleBack} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all active:scale-95">
          <i className="fa-solid fa-arrow-left"></i> Retour à la liste
        </button>
        <article className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-lg">
          {selectedArticle.image && <div className="h-64 sm:h-96 w-full overflow-hidden"><img src={selectedArticle.image} alt="" className="w-full h-full object-cover" /></div>}
          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-6"><span className="px-3 py-1 bg-blue-50 text-[10px] font-black text-blue-600 uppercase tracking-widest rounded-full">{selectedArticle.published}</span></div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-8 leading-tight">{selectedArticle.title}</h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
          </div>
          <div className="p-8 sm:p-12 pt-0 border-t border-slate-50 mt-8 flex justify-center">
            <button 
              onClick={handleBack} 
              className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all active:scale-95"
            >
              <i className="fa-solid fa-arrow-left"></i> Retour aux actualités
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm gap-4">
        <div className="flex items-center">
          <div className={`w-2.5 h-2.5 rounded-full mr-3 ${refreshing ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`}></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{refreshing ? 'Synchronisation...' : 'Articles à jour'}</span>
        </div>
        <button onClick={() => fetchArticles(true)} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold">Actualiser</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {loading && articles.length === 0 ? [1,2,3,4,5,6].map(i => <div key={i} className="bg-white h-80 rounded-[2rem] border border-slate-200 animate-pulse"></div>) :
          displayedArticles.map((art) => (
            <article 
              key={art.id} 
              onClick={() => handleSelectArticle(art)}
              className={`bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group cursor-pointer ${clickingId === art.id ? 'scale-[0.97] opacity-80 bg-slate-50' : 'scale-100'}`}
            >
              <div className="h-44 sm:h-52 bg-slate-100 overflow-hidden relative">
                {art.image && <img src={art.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />}
                <div className="absolute top-4 left-4"><span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[9px] font-black text-slate-800 tracking-widest uppercase">{art.published}</span></div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <h3 
                  className="text-lg font-black text-slate-900 leading-tight mb-4 line-clamp-2 hover:text-blue-600 transition-colors"
                >
                  {art.title}
                </h3>
                <p className="text-slate-500 text-xs mb-6 line-clamp-3 italic">{art.summary}</p>
                <div className="mt-auto flex justify-end">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center group-hover:bg-slate-900 transition-all">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </article>
          ))
        }
      </div>
    </div>
  );
};

export default Actus;