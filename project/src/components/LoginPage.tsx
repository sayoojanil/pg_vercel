import React, { useState, useEffect } from 'react';
import { User, Lock, Heart, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  // Initialize state with values from localStorage, if available
  const [email, setEmail] = useState(() => localStorage.getItem('loginEmail') || '');
  const [password, setPassword] = useState(() => localStorage.getItem('loginPassword') || '');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // New state for success message
  const [loginAttempts, setLoginAttempts] = useState(() => 
    parseInt(localStorage.getItem('loginAttempts') || '0', 10)
  );
  const [isTimedOut, setIsTimedOut] = useState(() => 
    localStorage.getItem('isTimedOut') === 'true'
  );
  const [timeoutSeconds, setTimeoutSeconds] = useState(() => 
    parseInt(localStorage.getItem('timeoutSeconds') || '0', 10)
  );
  const [timeoutMultiplier, setTimeoutMultiplier] = useState(() => 
    parseInt(localStorage.getItem('timeoutMultiplier') || '1', 10)
  );
  const { login, isLoading } = useAuth();

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('loginEmail', email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem('loginPassword', password);
  }, [password]);

  useEffect(() => {
    localStorage.setItem('loginAttempts', loginAttempts.toString());
  }, [loginAttempts]);

  useEffect(() => {
    localStorage.setItem('isTimedOut', isTimedOut.toString());
  }, [isTimedOut]);

  useEffect(() => {
    localStorage.setItem('timeoutSeconds', timeoutSeconds.toString());
  }, [timeoutSeconds]);

  useEffect(() => {
    localStorage.setItem('timeoutMultiplier', timeoutMultiplier.toString());
  }, [timeoutMultiplier]);

  // Handle timeout countdown
  useEffect(() => {
    const savedTimeoutEnd = localStorage.getItem('timeoutEnd');
    if (savedTimeoutEnd && isTimedOut) {
      const endTime = parseInt(savedTimeoutEnd, 10);
      const currentTime = Date.now();
      const remainingSeconds = Math.max(0, Math.floor((endTime - currentTime) / 1000));

      if (remainingSeconds > 0) {
        setTimeoutSeconds(remainingSeconds);
      } else {
        setIsTimedOut(false);
        setLoginAttempts(0);
        setTimeoutSeconds(0);
        localStorage.removeItem('loginEmail');
        localStorage.removeItem('loginPassword');
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('isTimedOut');
        localStorage.removeItem('timeoutSeconds');
        localStorage.removeItem('timeoutEnd');
      }
    }

    let timer: NodeJS.Timeout;
    if (isTimedOut && timeoutSeconds > 0) {
      timer = setInterval(() => {
        setTimeoutSeconds((prev) => {
          if (prev <= 1) {
            setIsTimedOut(false);
            setLoginAttempts(0);
            localStorage.removeItem('loginEmail');
            localStorage.removeItem('loginPassword');
            localStorage.removeItem('loginAttempts');
            localStorage.removeItem('isTimedOut');
            localStorage.removeItem('timeoutSeconds');
            localStorage.removeItem('timeoutEnd');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimedOut, timeoutSeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(''); // Clear success message on new submission

    if (isTimedOut) {
      setError(`Too many failed attempts. Please wait ${timeoutSeconds} seconds.`);
      return;
    }

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoginAttempts((prev) => prev + 1);
      if (loginAttempts + 1 >= 3) {
        setIsTimedOut(true);
        const newTimeout = 60 * timeoutMultiplier;
        setTimeoutSeconds(newTimeout);
        localStorage.setItem('timeoutEnd', (Date.now() + newTimeout * 1000).toString());
        setTimeoutMultiplier((prev) => prev * 2);
      }
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials.');
      setLoginAttempts((prev) => prev + 1);
      if (loginAttempts + 1 >= 3) {
        setIsTimedOut(true);
        const newTimeout = 60 * timeoutMultiplier;
        setTimeoutSeconds(newTimeout);
        localStorage.setItem('timeoutEnd', (Date.now() + newTimeout * 1000).toString());
        setTimeoutMultiplier((prev) => prev * 2);
      }
    } else {
      setSuccess('Login successful! Welcome back.'); // Set success message
      localStorage.removeItem('loginEmail');
      localStorage.removeItem('loginPassword');
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('isTimedOut');
      localStorage.removeItem('timeoutSeconds');
      localStorage.removeItem('timeoutEnd');
      localStorage.removeItem('timeoutMultiplier');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Shyamaprabha Admin</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to manage your paying guest facility</p>
        </div>
        
        <div className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-xl">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  placeholder="example@gmail.com"
                  disabled={isTimedOut}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  placeholder="********"
                  disabled={isTimedOut}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isTimedOut}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">
              {error}
            </div>
          )}
          
          {success && (
            <div className="text-green-600 text-sm text-center bg-green-50 p-2 rounded-lg">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isTimedOut}
            onClick={handleSubmit}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? 'Signing in...' : isTimedOut ? `Too many attempts! Please wait ${timeoutSeconds}s` : 'Sign In'}
          </button>
          
          <div className="text-center text-xs text-red-400 mt-4">
            Access restricted: Admin-only portal. Please authenticate to proceed.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;