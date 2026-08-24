export default function ResultCard({ name, openNumber, jodi, closeNumber, openTime, closeTime, status }) {
  const isPending = status === 'Pending';
  const isOpen = status === 'Open';
  const isClosed = status === 'Closed';

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-sm hover:border-zinc-700 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-zinc-100">{name}</h3>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
          isOpen ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
          isClosed ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
          'bg-accent-500/10 text-accent-500 border-accent-500/20'
        }`}>
          {status}
        </span>
      </div>

      <div className="flex justify-center items-center gap-6 my-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-500 tracking-wider">
            {openNumber || '***'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black text-white">
            {jodi || '**'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-500 tracking-wider">
            {closeNumber || '***'}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-zinc-500 mt-4 pt-4 border-t border-zinc-800/50">
        <div className="flex items-center gap-1">
          <span>Open:</span>
          <span className="text-zinc-300 font-medium">{openTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Close:</span>
          <span className="text-zinc-300 font-medium">{closeTime}</span>
        </div>
      </div>
    </div>
  );
}
