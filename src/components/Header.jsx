import { RefreshCw } from 'lucide-react';

export default function Header({ title, onRefresh, isRefreshing }) {
  return (
    <header className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="flex items-center justify-between px-4 h-14">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-yellow-200">
          {title}
        </h1>
        {onRefresh && (
          <button 
            onClick={onRefresh}
            className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800/50 active:scale-95"
          >
            <RefreshCw size={20} className={isRefreshing ? 'animate-spin text-accent-500' : ''} />
          </button>
        )}
      </div>
    </header>
  );
}
