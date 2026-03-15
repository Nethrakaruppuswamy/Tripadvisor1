import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Place } from '../types';

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  return (
    <Link to={`/place/${place.id}`} className="trip-card group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full">
          <Star className="w-4 h-4 text-trip-green fill-trip-green" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 group-hover:text-trip-green transition-colors">{place.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full border border-trip-green mr-0.5 ${
                  i < Math.floor(place.rating) ? 'bg-trip-green' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">{place.reviewsCount.toLocaleString()} reviews</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{place.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-bold">{place.price}</span>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{place.type}</span>
        </div>
      </div>
    </Link>
  );
};
