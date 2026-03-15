import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login
    const user = {
      id: 'u1',
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      role: formData.email.includes('admin') ? 'admin' : 'user'
    };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-trip-green rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h1 className="text-2xl font-bold">{isLogin ? 'Sign in to Tripadvisor' : 'Join Tripadvisor'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold mb-1">Full Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-xl border-gray-200 focus:ring-trip-green"
                placeholder="John Doe"
                required
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold mb-1">Email Address</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl border-gray-200 focus:ring-trip-green"
              placeholder="name@example.com"
              required
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-xl border-gray-200 focus:ring-trip-green"
              placeholder="••••••••"
              required
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          
          <button type="submit" className="w-full trip-button-primary py-3 text-lg mt-4">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-trip-green hover:underline"
          >
            {isLogin ? "Don't have an account? Join now" : "Already have an account? Sign in"}
          </button>
        </div>
        
        <p className="mt-8 text-[10px] text-gray-400 text-center leading-relaxed">
          By continuing, you agree to our Terms of Service and Privacy Policy.
          This is a clone for educational purposes.
        </p>
      </div>
    </div>
  );
};
