"use client";

import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== password2) {
      setError('Passwords do not match.');
      toast.error('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    try {
      await authService.register({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        password2,
      });
      router.push('/login?registered=1');
      router.refresh();
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      const data = (err as { response?: { data?: unknown } })?.response?.data;
      if (status === 500) {
        const msg = "Registration is temporarily unavailable (server error). Please try again later.";
        setError(msg);
        toast.error(msg);
      } else if (data && typeof data === 'object') {
        const firstError = Object.values(data as Record<string, string[]>).flat()[0];
        const msg = typeof firstError === 'string'
            ? firstError
            : 'Registration failed. Please check your details.';
        setError(msg);
        toast.error(msg);
      } else {
        const msg = 'Registration failed. Please try again.';
        setError(msg);
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex flex-col lg:flex-row-reverse w-full max-w-5xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden">
        
        {/* Right Side: Banner / Info (Reversed for symmetry with login) */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary/5 p-12 flex-col justify-center relative overflow-hidden">
          <div className="absolute top-[20%] right-[-10%] w-72 h-72 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
          
          <div className="relative z-10 space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Join <span className="text-primary">Our Store</span> today
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Create an account to unlock exclusive features, lightning-fast checkout, and special personalized offers.
            </p>
            <div className="pt-8">
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">✓</div>
                  <span className="text-gray-700 font-medium">Free shipping on your first order</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">✓</div>
                  <span className="text-gray-700 font-medium">Earn reward points on every purchase</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">✓</div>
                  <span className="text-gray-700 font-medium">Fast &amp; easy returns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 xl:p-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h2>
          <p className="text-gray-500 mb-8">Join us today to get the best deals.</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                <input 
                  type="text" 
                  required 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
                  placeholder="John" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                <input 
                  type="text" 
                  required 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
                  placeholder="Doe" 
                />
              </div>
            </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
                  placeholder="Create a password" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <input 
                  type="password" 
                  required 
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
                  placeholder="Confirm password" 
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white font-semibold py-3.5 px-4 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-primary/20 mt-6 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center">
            <div className="h-px bg-gray-200 w-full"></div>
            <span className="px-4 text-sm text-gray-400 bg-white whitespace-nowrap">Or sign up with</span>
            <div className="h-px bg-gray-200 w-full"></div>
          </div>

          <button className="mt-8 w-full flex items-center justify-center gap-3 border border-gray-200 bg-white text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <FcGoogle className="text-2xl" />
            Sign up with Google
          </button>

          <p className="mt-10 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-primary hover:underline">
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}