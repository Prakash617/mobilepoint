"use client";

import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const setUser = useAuthStore((s) => s.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (window.location.search.includes('registered=1')) {
      setRegistered(true);
      window.history.replaceState({}, '', '/login');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { access, refresh } = await authService.login(email, password);
      setAuth(access, refresh);
      try {
        const user = await authService.getMe();
        setUser(user);
      } catch {
        // token is valid even if profile fetch fails
      }
      router.push('/');
      router.refresh();
    } catch (err: unknown) {
      const detail = (err as { response?: { data?: { detail?: string } } })
        ?.response?.data?.detail;
      setError(detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden">
        
        {/* Left Side: Banner / Info */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary/5 p-12 flex-col justify-center relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
          
          <div className="relative z-10 space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Welcome back to <span className="text-primary">Our Store</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Discover the latest products, track your orders, and enjoy exclusive member-only deals today.
            </p>
            <div className="pt-8">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-200"></div>
                <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-300"></div>
                <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-400"></div>
                <div className="w-12 h-12 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center font-bold text-sm">
                  10k+
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-500 font-medium">Join thousands of happy customers</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 xl:p-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Log in</h2>
          <p className="text-gray-500 mb-8">Enter your credentials to access your account.</p>

          {registered && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3 mb-6">
              Account created successfully! Please log in.
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
                placeholder="you@example.com" 
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link href="/forgot-password" className="text-[13px] font-semibold text-primary hover:underline">Forgot password?</Link>
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
                placeholder="••••••••" 
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {error}
              </div>
            )}

            <div className="flex items-center pt-1">
              <input 
                id="remember-me" 
                type="checkbox" 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer" 
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white font-semibold py-3.5 px-4 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-primary/20 mt-4 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center">
            <div className="h-px bg-gray-200 w-full"></div>
            <span className="px-4 text-sm text-gray-400 bg-white whitespace-nowrap">Or continue with</span>
            <div className="h-px bg-gray-200 w-full"></div>
          </div>

          <button className="mt-8 w-full flex items-center justify-center gap-3 border border-gray-200 bg-white text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>

          <p className="mt-10 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-bold text-primary hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
