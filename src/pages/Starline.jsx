import { useState } from 'react';
import Header from '../components/Header';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { useMarkets } from '../hooks/useMarkets';

export default function Starline() {
  const { markets, loading, error, refetch } = useMarkets('starline');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="flex flex-col min-h-screen pull-to-refresh-container">
      <Header title="Starline Results" onRefresh={handleRefresh} isRefreshing={isRefreshing} />
      
      <main className="flex-1 p-4 space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {loading && !isRefreshing ? (
          <LoadingSpinner />
        ) : markets.length === 0 ? (
          <EmptyState message="No starline markets available right now." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {markets.map((market) => (
              <ResultCard
                key={market.id}
                name={market.name}
                openNumber={market.open_number}
                jodi={market.jodi}
                closeNumber={market.close_number}
                openTime={market.open_time}
                closeTime={market.close_time}
                status={market.status}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
