'use client';
import { supabase } from '@/app/lib/supabaseClient';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard'); // Redirect to dashboard if already logged in
      }
    };
    checkUser();
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data.user) {
        // Check if user has completed their student profile
        const { data: profile, error: profileError } = await supabase
          .from('student_profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Profile check error:', profileError);
        }

        // Redirect based on profile completion
        if (profile) {
          router.push('/dashboard');
        } else {
          router.push('/complete-profile');
        }
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { 
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) {
        setMessage(error.message);
      }
    } catch (error) {
      setMessage('Google login failed. Please try again.');
      console.error('Google login error:', error);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Password reset email sent! Check your inbox.');
        setShowForgotPassword(false);
        setForgotEmail('');
      }
    } catch (error) {
      setMessage('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 relative">
      {/* Background decorative elements */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <Link href="/" aria-label="Go to homepage">
          <img
            src="/image.png"
            alt="IEEE Logo"
            className="h-12 w-auto sm:h-20 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
          />
        </Link>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative bg-gray-800/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-700/50 w-full max-w-md mx-4">
        {/* Enhanced shadow with dark blue glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-xl -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/30 to-indigo-800/30 rounded-3xl blur-2xl -z-20"></div>
        
        {!showForgotPassword ? (
          <>
            <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-center text-gray-400 mb-8">Sign in to your IEEE student account</p>
            
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="w-full px-5 py-4 rounded-xl bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  className="w-full px-5 py-4 rounded-xl bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Forgot your password?
                </button>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </span>
              </button>
            </form>
            
            <div className="flex items-center my-8">
              <hr className="flex-1 border-gray-600/50" />
              <span className="mx-6 text-gray-400 font-medium text-sm">OR CONTINUE WITH</span>
              <hr className="flex-1 border-gray-600/50" />
            </div>
            
            <button
              onClick={handleGoogleLogin}
              className="w-full relative overflow-hidden flex items-center justify-center bg-gray-700/50 border border-gray-600/50 py-4 rounded-xl shadow-lg hover:bg-gray-600/50 transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-sm group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Google Icon SVG */}
              <svg className="w-6 h-6 mr-3 relative z-10" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              
              <span className="font-medium text-white relative z-10">Continue with Google</span>
            </button>
          </>
        ) : (
          /* Forgot Password Form */
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Reset Password
              </h2>
              <p className="text-gray-400">Enter your email to receive a password reset link</p>
            </div>
            
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full px-5 py-4 rounded-xl bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </span>
              </button>
            </form>
            
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotEmail('');
                  setMessage('');
                }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                ← Back to Sign In
              </button>
            </div>
          </>
        )}
        
        {message && (
          <div className={`mt-6 p-4 rounded-xl text-center font-medium ${
            message.includes('reset email sent') || message.includes('Check your inbox')
              ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
            {message}
          </div>
        )}
        
        {!showForgotPassword && (
          <>
            <p className="mt-8 text-center text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300">
                Create one here
              </Link>
            </p>

            {/* Student-specific help section */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <h3 className="text-sm font-semibold text-blue-400 mb-2">Student Support</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Having trouble accessing your account? Contact your IEEE student chapter coordinator or{' '}
                <Link href="/contact" className="text-blue-400 hover:text-blue-300">
                  reach out to support
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
