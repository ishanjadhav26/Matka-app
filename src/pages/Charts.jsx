import { useState, useEffect } from 'react';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { supabase } from '../lib/supabase';

export default function Charts() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!supabase) {
        setError('Supabase not configured');
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('market_history')
          .select(`
            *,
            markets ( name )
          `)
          .order('result_date', { ascending: false })
          .limit(50);
          
        if (fetchError) throw fetchError;
        setHistory(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="History Charts" />
      
      <main className="flex-1 p-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : history.length === 0 ? (
          <EmptyState message="No historical data available." />
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-zinc-400 bg-zinc-950/50 uppercase border-b border-zinc-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Market</th>
                    <th className="px-4 py-3 font-semibold text-center">Open</th>
                    <th className="px-4 py-3 font-semibold text-center text-accent-500">Jodi</th>
                    <th className="px-4 py-3 font-semibold text-center">Close</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {history.map((record) => (
                    <tr key={record.id} className="hover:bg-zinc-800/50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-zinc-300">
                        {formatDate(record.result_date)}
                      </td>
                      <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                        {record.markets?.name || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-center">{record.open_number || '-'}</td>
                      <td className="px-4 py-3 text-center font-bold text-accent-500">{record.jodi || '-'}</td>
                      <td className="px-4 py-3 text-center">{record.close_number || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
