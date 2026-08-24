import { AlertCircle } from 'lucide-react';

export default function EmptyState({ message = "No data available at the moment." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-zinc-900 p-4 rounded-full mb-4">
        <AlertCircle size={32} className="text-zinc-600" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-300 mb-2">No Results Found</h3>
      <p className="text-sm text-zinc-500 max-w-xs">{message}</p>
    </div>
  );
}
