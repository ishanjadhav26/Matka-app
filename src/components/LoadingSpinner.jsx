export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="w-10 h-10 border-4 border-zinc-800 border-t-accent-500 rounded-full animate-spin"></div>
      <p className="text-zinc-500 text-sm">Loading results...</p>
    </div>
  );
}
