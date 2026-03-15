import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Hotel, Utensils, MapPin, Compass } from 'lucide-react';
import { PlaceCard } from '../components/PlaceCard';
import { Place } from '../types';

export const Home: React.FC = () => {
  const [hotels, setHotels] = useState<Place[]>([]);
  const [restaurants, setRestaurants] = useState<Place[]>([]);
  const [attractions, setAttractions] = useState<Place[]>([]);

  useEffect(() => {
    fetch('/api/places?type=hotel').then(res => res.json()).then(setHotels);
    fetch('/api/places?type=restaurant').then(res => res.json()).then(setRestaurants);
    fetch('/api/places?type=attraction').then(res => res.json()).then(setAttractions);
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
            className="w-full h-full object-cover"
            alt="Hero background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 max-w-3xl w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Where to?
          </h1>
          
          <div className="bg-white p-2 rounded-full shadow-2xl flex items-center gap-2 max-w-2xl mx-auto">
            <div className="flex-1 flex items-center gap-3 pl-6">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Places to go, things to do, hotels..."
                className="w-full border-none focus:ring-0 text-lg py-3"
              />
            </div>
            <button className="trip-button-primary py-3 px-8 text-lg">
              Search
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/search?type=hotel" className="flex items-center gap-2 bg-white/90 backdrop-blur px-6 py-3 rounded-xl font-bold hover:bg-white transition-all">
              <Hotel className="w-5 h-5 text-trip-green" /> Hotels
            </Link>
            <Link to="/search?type=restaurant" className="flex items-center gap-2 bg-white/90 backdrop-blur px-6 py-3 rounded-xl font-bold hover:bg-white transition-all">
              <Utensils className="w-5 h-5 text-trip-green" /> Restaurants
            </Link>
            <Link to="/search?type=attraction" className="flex items-center gap-2 bg-white/90 backdrop-blur px-6 py-3 rounded-xl font-bold hover:bg-white transition-all">
              <Compass className="w-5 h-5 text-trip-green" /> Attractions
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16 space-y-20">
        {/* Popular Hotels */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Stay somewhere award-winning</h2>
              <p className="text-gray-600">2024’s Travelers’ Choice Best of the Best Hotels</p>
            </div>
            <Link to="/search?type=hotel" className="text-sm font-bold underline">See all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotels.slice(0, 4).map(hotel => (
              <PlaceCard key={hotel.id} place={hotel} />
            ))}
          </div>
        </section>

        {/* Popular Restaurants */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Top-rated restaurants</h2>
              <p className="text-gray-600">The best flavors around the world</p>
            </div>
            <Link to="/search?type=restaurant" className="text-sm font-bold underline">See all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.slice(0, 4).map(restaurant => (
              <PlaceCard key={restaurant.id} place={restaurant} />
            ))}
          </div>
        </section>

        {/* Attractions */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Must-visit attractions</h2>
              <p className="text-gray-600">Unforgettable experiences waiting for you</p>
            </div>
            <Link to="/search?type=attraction" className="text-sm font-bold underline">See all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {attractions.slice(0, 4).map(attraction => (
              <PlaceCard key={attraction.id} place={attraction} />
            ))}
          </div>
        </section>

        {/* Travel Inspiration */}
        <section className="bg-trip-gray rounded-3xl p-8 md:p-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-trip-green font-bold uppercase tracking-widest text-xs">Inspiration</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
                Plan your next trip with confidence
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Discover hidden gems, local favorites, and the most iconic landmarks. Our community of travelers helps you make the best choices.
              </p>
              <button className="trip-button-secondary py-4 px-10 text-lg">
                Explore Trips
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80" className="rounded-2xl aspect-square object-cover" alt="Travel" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80" className="rounded-2xl aspect-square object-cover mt-8" alt="Travel" referrerPolicy="no-referrer" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
