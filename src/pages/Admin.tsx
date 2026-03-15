import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { Place } from '../types';

export const Admin: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newPlace, setNewPlace] = useState<Partial<Place>>({
    type: 'hotel',
    rating: 5,
    reviewsCount: 0,
    price: '$'
  });

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    fetch('/api/places').then(res => res.json()).then(setPlaces);
  }, []);

  if (!user || user.role !== 'admin') {
    return <div className="p-20 text-center font-bold text-red-500">Access Denied</div>;
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlace)
    });
    if (res.ok) {
      const added = await res.json();
      setPlaces([...places, added]);
      setIsAdding(false);
      setNewPlace({ type: 'hotel', rating: 5, reviewsCount: 0, price: '$' });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this place?')) {
      const res = await fetch(`/api/places/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPlaces(places.filter(p => p.id !== id));
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="trip-button-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add New Place
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Add New Place</h2>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl border-gray-200"
                  required
                  onChange={e => setNewPlace({ ...newPlace, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Type</label>
                <select
                  className="w-full p-3 rounded-xl border-gray-200"
                  onChange={e => setNewPlace({ ...newPlace, type: e.target.value as any })}
                >
                  <option value="hotel">Hotel</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="attraction">Attraction</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Price</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl border-gray-200"
                  placeholder="$ or $$"
                  required
                  onChange={e => setNewPlace({ ...newPlace, price: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-1">Location</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl border-gray-200"
                  required
                  onChange={e => setNewPlace({ ...newPlace, location: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-1">Image URL</label>
                <input
                  type="url"
                  className="w-full p-3 rounded-xl border-gray-200"
                  placeholder="https://images.unsplash.com/..."
                  required
                  onChange={e => setNewPlace({ ...newPlace, image: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-1">Description</label>
                <textarea
                  className="w-full p-3 rounded-xl border-gray-200"
                  rows={3}
                  required
                  onChange={e => setNewPlace({ ...newPlace, description: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 flex gap-4 mt-4">
                <button type="submit" className="flex-1 trip-button-primary">Save Place</button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 bg-gray-100 py-3 rounded-full font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold text-sm">Place</th>
              <th className="px-6 py-4 font-bold text-sm">Type</th>
              <th className="px-6 py-4 font-bold text-sm">Location</th>
              <th className="px-6 py-4 font-bold text-sm">Rating</th>
              <th className="px-6 py-4 font-bold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {places.map(place => (
              <tr key={place.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={place.image} className="w-10 h-10 rounded-lg object-cover" alt="" referrerPolicy="no-referrer" />
                    <span className="font-medium">{place.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 capitalize text-sm">{place.type}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{place.location}</td>
                <td className="px-6 py-4 text-sm">{place.rating} / 5</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Edit className="w-4 h-4" /></button>
                    <button
                      onClick={() => handleDelete(place.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
