import Link from 'next/link';
import { HiOutlineMail } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden">
        
        {/* Left Side: Banner / Info */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary/5 p-12 flex-col justify-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-primary mb-6">
              <HiOutlineMail size={32} />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Don't worry, we've got you covered.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              It happens to the best of us. Just enter the email address associated with your account, and we'll send you a secure link to reset your password.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 xl:p-16 flex flex-col justify-center relative">
          
          <Link href="/login" className="absolute top-6 left-6 text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1 text-[13px] font-semibold">
            <IoIosArrowBack size={16} /> Back
          </Link>

          <div className="mt-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
            <p className="text-gray-500 mb-8">Enter your email and we'll send you a reset link.</p>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
                  placeholder="you@example.com" 
                />
              </div>

              <button 
                type="button" 
                className="w-full bg-primary text-white font-semibold py-3.5 px-4 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-primary/20 mt-2"
              >
                Send Reset Link
              </button>
            </form>

            <p className="mt-10 text-center text-sm text-gray-600">
              Remembered your password?{' '}
              <Link href="/login" className="font-bold text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
