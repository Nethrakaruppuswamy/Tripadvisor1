import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { PlaceDetail } from './pages/PlaceDetail';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';

const Footer: React.FC = () => (
  <footer className="bg-trip-gray py-12 px-4 mt-20 border-t border-gray-200">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-trip-green rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="font-bold text-xl">Tripadvisor</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          © 2026 Tripadvisor LLC All rights reserved. Tripadvisor is not a booking agent or travel agency.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-4">About Tripadvisor</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li><a href="#" className="hover:underline">About Us</a></li>
          <li><a href="#" className="hover:underline">Press</a></li>
          <li><a href="#" className="hover:underline">Resources</a></li>
          <li><a href="#" className="hover:underline">Trust & Safety</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Explore</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li><a href="#" className="hover:underline">Write a review</a></li>
          <li><a href="#" className="hover:underline">Add a Place</a></li>
          <li><a href="#" className="hover:underline">Join</a></li>
          <li><a href="#" className="hover:underline">Travelers' Choice</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Do Business With Us</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li><a href="#" className="hover:underline">Owners</a></li>
          <li><a href="#" className="hover:underline">Business Advantage</a></li>
          <li><a href="#" className="hover:underline">Advertise</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/place/:id" element={<PlaceDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
