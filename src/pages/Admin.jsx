import { useState } from 'react';
import Header from '../components/Header';
import { useMarkets } from '../hooks/useMarkets';
import { supabase } from '../lib/supabase';
import { Trash2, Edit2, Plus, X, Save } from 'lucide-react';

export default function Admin() {
  const { markets, loading, error: fetchError } = useMarkets();
  const [isEditing, setIsEditing] = useState(false);
  const [currentMarket, setCurrentMarket] = useState(null);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  const initialFormState = {
    name: '', open_number: '', jodi: '', close_number: '', 
    open_time: '', close_time: '', status: 'Pending', category: 'main'
  };
  const [formData, setFormData] = useState(initialFormState);

  const resetForm = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setCurrentMarket(null);
  };

  const showToast = (msg, type = 'success') => {
    if (type === 'success') {
      setActionSuccess(msg);
      setTimeout(() => setActionSuccess(''), 3000);
    } else {
      setActionError(msg);
      setTimeout(() => setActionError(''), 3000);
    }
  };

  const handleEdit = (market) => {
    setFormData(market);
    setCurrentMarket(market);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this market?')) return;
    
    try {
      const { error } = await supabase.from('markets').delete().eq('id', id);
      if (error) throw error;
      showToast('Market deleted successfully');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Market name is required', 'error');
      return;
    }

    try {
      if (isEditing && currentMarket) {
        const { error } = await supabase
          .from('markets')
          .update(formData)
          .eq('id', currentMarket.id);
        if (error) throw error;
        showToast('Market updated successfully');
      } else {
        const { error } = await supabase
          .from('markets')
          .insert([formData]);
        if (error) throw error;
        showToast('Market added successfully');
      }
      resetForm();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header title="Admin Dashboard" />
      
      {actionSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-4">
          <span>{actionSuccess}</span>
        </div>
      )}

      {actionError && (
        <div className="fixed top-16 left-4 right-4 z-50 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-4">
          <span>{actionError}</span>
        </div>
      )}

      <main className="p-4">
        {/* Form Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-accent-500 flex items-center gap-2">
              {isEditing ? <Edit2 size={18} /> : <Plus size={18} />}
              {isEditing ? 'Edit Market' : 'Add New Market'}
            </h2>
            {isEditing && (
              <button onClick={resetForm} className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-800">
                <X size={20} />
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-zinc-400 mb-1">Market Name *</label>
                <input 
                  type="text" required
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-all"
                  placeholder="e.g. Kalyan Day"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Category</label>
                <select 
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-accent-500 focus:outline-none"
                >
                  <option value="main">Main</option>
                  <option value="starline">Starline</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Status</label>
                <select 
                  value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-accent-500 focus:outline-none"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Open Number</label>
                  <input 
                    type="text" 
                    value={formData.open_number} onChange={e => setFormData({...formData, open_number: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-center font-bold focus:border-accent-500 focus:outline-none"
                    placeholder="123"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-accent-500 mb-1">Jodi</label>
                  <input 
                    type="text" 
                    value={formData.jodi} onChange={e => setFormData({...formData, jodi: e.target.value})}
                    className="w-full bg-zinc-950 border border-accent-500/50 rounded-lg px-3 py-2 text-sm text-center font-bold focus:border-accent-500 focus:outline-none"
                    placeholder="45"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Close Number</label>
                  <input 
                    type="text" 
                    value={formData.close_number} onChange={e => setFormData({...formData, close_number: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-center font-bold focus:border-accent-500 focus:outline-none"
                    placeholder="678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Open Time</label>
                <input 
                  type="text" 
                  value={formData.open_time} onChange={e => setFormData({...formData, open_time: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-accent-500 focus:outline-none"
                  placeholder="1:00 PM"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Close Time</label>
                <input 
                  type="text" 
                  value={formData.close_time} onChange={e => setFormData({...formData, close_time: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-accent-500 focus:outline-none"
                  placeholder="3:00 PM"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-4">
              <Save size={18} />
              {isEditing ? 'Save Changes' : 'Add Market'}
            </button>
          </form>
        </div>

        {/* List Section */}
        <h3 className="font-bold text-lg mb-4 text-white">Manage Markets</h3>
        
        {fetchError ? (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-xl text-sm">{fetchError}</div>
        ) : loading ? (
          <div className="animate-pulse flex flex-col gap-3">
            {[1, 2, 3].map(i => <div key={i} className="h-16 bg-zinc-900 rounded-xl"></div>)}
          </div>
        ) : (
          <div className="space-y-3">
            {markets.map(market => (
              <div key={market.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <div className="font-bold text-sm">{market.name}</div>
                  <div className="text-xs text-zinc-500 mt-1 flex gap-2">
                    <span className="text-accent-500 font-medium">[{market.category}]</span>
                    <span>{market.status}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(market)} className="p-2 bg-zinc-800 rounded-lg text-zinc-300 hover:text-accent-500 hover:bg-zinc-700 transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(market.id)} className="p-2 bg-zinc-800 rounded-lg text-zinc-300 hover:text-red-500 hover:bg-zinc-700 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            
            {markets.length === 0 && (
              <div className="text-center text-zinc-500 py-8">No markets to display</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
