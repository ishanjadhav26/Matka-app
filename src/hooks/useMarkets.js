import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useMarkets(category = null) {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarkets = async () => {
    if (!supabase) {
      setError('Supabase not configured');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let query = supabase
        .from('markets')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      setMarkets(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkets();

    if (!supabase) return;

    // Realtime subscription
    const subscription = supabase
      .channel('markets_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'markets' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setMarkets((prev) => [payload.new, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setMarkets((prev) => prev.map(m => m.id === payload.new.id ? payload.new : m));
        } else if (payload.eventType === 'DELETE') {
          setMarkets((prev) => prev.filter(m => m.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [category]);

  return { markets, loading, error, refetch: fetchMarkets };
}
