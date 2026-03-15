import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Share2, Heart, Info, MessageSquare } from 'lucide-react';
import { Place, Review } from '../types';

export const PlaceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    fetch(`/api/places/${id}`).then(res => res.json()).then(setPlace);
    fetch(`/api/reviews/${id}`).then(res => res.json()).then(setReviews);
  }, [id]);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to add a review');
      return;
    }
    const review = {
      placeId: id,
      userName: user.name,
      rating: newReview.rating,
      comment: newReview.comment
    };
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    if (res.ok) {
      const added = await res.json();
      setReviews([added, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
    }
  };

  if (!place) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">{place.name}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-3.5 h-3.5 rounded-full border border-trip-green mr-0.5 ${i < Math.floor(place.rating) ? 'bg-trip-green' : ''}`} />
                ))}
              </div>
              <span className="font-bold">{place.reviewsCount.toLocaleString()} reviews</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{place.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Share2 className="w-5 h-5" /></button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Heart className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] mb-12">
        <div className="md:col-span-2 h-full">
          <img src={place.image} className="w-full h-full object-cover rounded-l-2xl" alt={place.name} referrerPolicy="no-referrer" />
        </div>
        <div className="hidden md:grid grid-rows-2 gap-4 h-full">
          <img src={`https://picsum.photos/seed/${place.id}1/800/600`} className="w-full h-full object-cover" alt="Gallery" referrerPolicy="no-referrer" />
          <img src={`https://picsum.photos/seed/${place.id}2/800/600`} className="w-full h-full object-cover" alt="Gallery" referrerPolicy="no-referrer" />
        </div>
        <div className="hidden md:block h-full">
          <img src={`https://picsum.photos/seed/${place.id}3/800/600`} className="w-full h-full object-cover rounded-r-2xl" alt="Gallery" referrerPolicy="no-referrer" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* About */}
          <section>
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{place.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-trip-gray rounded-full flex items-center justify-center"><Info className="w-5 h-5 text-trip-green" /></div>
                <div><p className="text-xs text-gray-500 uppercase font-bold">Category</p><p className="font-medium">{place.category}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-trip-gray rounded-full flex items-center justify-center"><Star className="w-5 h-5 text-trip-green" /></div>
                <div><p className="text-xs text-gray-500 uppercase font-bold">Rating</p><p className="font-medium">{place.rating} / 5.0</p></div>
              </div>
            </div>
          </section>

          {/* Map */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <div className="w-full h-[300px] rounded-2xl overflow-hidden border border-gray-200">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=-0.1,51.5,-0.0,51.6&layer=mapnik`}
                title="Map"
              />
            </div>
          </section>

          {/* Reviews */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Reviews ({reviews.length})</h2>
              <button className="trip-button-secondary py-2 px-6">Write a review</button>
            </div>

            {/* Add Review Form */}
            {user && (
              <form onSubmit={handleAddReview} className="bg-trip-gray p-6 rounded-2xl mb-12">
                <h3 className="font-bold mb-4">Add your review</h3>
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: r })}
                      className={`p-1 rounded-full ${newReview.rating >= r ? 'text-trip-green' : 'text-gray-300'}`}
                    >
                      <Star className={`w-6 h-6 ${newReview.rating >= r ? 'fill-trip-green' : ''}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full p-4 rounded-xl border-gray-200 focus:ring-trip-green mb-4"
                  rows={4}
                  placeholder="Share your experience..."
                  value={newReview.comment}
                  onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                  required
                />
                <button type="submit" className="trip-button-primary">Post Review</button>
              </form>
            )}

            <div className="space-y-8">
              {reviews.map(review => (
                <div key={review.id} className="border-b border-gray-100 pb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-trip-green rounded-full flex items-center justify-center text-white font-bold">
                      {review.userName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold">{review.userName}</p>
                      <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full border border-trip-green ${i < review.rating ? 'bg-trip-green' : ''}`} />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Booking Sidebar */}
        <aside className="h-fit sticky top-24">
          <div className="trip-card p-6">
            <h3 className="text-xl font-bold mb-4">Check Availability</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Check-in / Check-out</label>
                <input type="date" className="w-full p-3 rounded-lg border-gray-200 focus:ring-trip-green" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Guests</label>
                <select className="w-full p-3 rounded-lg border-gray-200 focus:ring-trip-green">
                  <option>2 adults, 0 children</option>
                  <option>1 adult</option>
                  <option>2 adults, 1 child</option>
                </select>
              </div>
              <button className="w-full trip-button-primary py-4 text-lg mt-4">
                View Deals
              </button>
              <p className="text-center text-xs text-gray-500 mt-4">
                Free cancellation until 24 hours before
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
