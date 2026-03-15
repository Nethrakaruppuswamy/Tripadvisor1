export interface Place {
  id: string;
  type: 'hotel' | 'restaurant' | 'attraction';
  name: string;
  location: string;
  rating: number;
  reviewsCount: number;
  price: string;
  image: string;
  description: string;
  category: string;
}

export interface Review {
  id: string;
  placeId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}
