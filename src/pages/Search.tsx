import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Star, ChevronDown } from 'lucide-react';
import { PlaceCard } from '../components/PlaceCard';
import { Place } from '../types';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  
  const type = searchParams.get('type');
  const query = searchParams.get('q');

  useEffect(() => {
    setLoading(true);
    let url = '/api/places?';
    if (type) url += `type=${type}&`;
    if (query) url += `search=${query}`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPlaces(data);
        setLoading(false);
      });
  }, [type, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5" />
              <h2 className="font-bold text-lg">Filters</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-sm mb-3 flex items-center justify-between">
                  Rating <ChevronDown className="w-4 h-4" />
                </h3>
                <div className="space-y-2">
                  {[5, 4, 3].map(rating => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-trip-green focus:ring-trip-green" />
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full border border-trip-green ${i < rating ? 'bg-trip-green' : ''}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">& up</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm mb-3 flex items-center justify-between">
                  Price <ChevronDown className="w-4 h-4" />
                </h3>
                <div className="space-y-2">
                  {['$', '$$', '$$$', '$$$$'].map(price => (
                    <label key={price} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-trip-green focus:ring-trip-green" />
                      <span className="text-sm text-gray-600">{price}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {query ? `Results for "${query}"` : type ? `${type.charAt(0).toUpperCase() + type.slice(1)}s` : 'All Places'}
            </h1>
            <p className="text-gray-500">{places.length} places found</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 rounded-xl aspect-[4/5]" />
              ))}
            </div>
          ) : places.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <h2 className="text-xl font-bold mb-2">No results found</h2>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
