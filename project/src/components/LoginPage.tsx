import React, { useState, useEffect } from 'react';
import { User, Lock, Heart, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import emailjs from '@emailjs/browser';
import { text } from 'framer-motion/client';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState(() => localStorage.getItem('loginEmail') || '');
  const [password, setPassword] = useState(() => localStorage.getItem('loginPassword') || '');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  // Init EmailJS
  useEffect(() => {
    emailjs.init('wGLn-tJ1O2G9maSvc'); // Replace with your EmailJS public key
  }, []);

  // Persist state
  useEffect(() => localStorage.setItem('loginEmail', email), [email]);
  useEffect(() => localStorage.setItem('loginPassword', password), [password]);
  useEffect(() => localStorage.setItem('loginAttempts', loginAttempts.toString()), [loginAttempts]);
  useEffect(() => localStorage.setItem('isTimedOut', isTimedOut.toString()), [isTimedOut]);
  useEffect(() => localStorage.setItem('timeoutSeconds', timeoutSeconds.toString()), [timeoutSeconds]);
  useEffect(() => localStorage.setItem('timeoutMultiplier', timeoutMultiplier.toString()), [timeoutMultiplier]);

  // Handle timeout countdown
  useEffect(() => {
    const savedTimeoutEnd = localStorage.getItem('timeoutEnd');
    if (savedTimeoutEnd && isTimedOut) {
      const endTime = parseInt(savedTimeoutEnd, 10);
      const currentTime = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - currentTime) / 1000));
      if (remaining > 0) {
        setTimeoutSeconds(remaining);
      } else {
        resetLockout();
      }
    }

    let timer: NodeJS.Timeout;
    if (isTimedOut && timeoutSeconds > 0) {
      timer = setInterval(() => {
        setTimeoutSeconds((prev) => {
          if (prev <= 1) {
            resetLockout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimedOut, timeoutSeconds]);

  const resetLockout = () => {
    setIsTimedOut(false);
    setLoginAttempts(0);
    setTimeoutSeconds(0);
    localStorage.removeItem('loginAttempts');
    localStorage.removeItem('isTimedOut');
    localStorage.removeItem('timeoutSeconds');
    localStorage.removeItem('timeoutEnd');
    localStorage.removeItem('timeoutMultiplier');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isTimedOut) {
      setError(`Too many failed attempts. Please wait ${timeoutSeconds} seconds.`);
      return;
    }

    if (!email || !password) {
      setError('Please fill in all fields');
      trackFailedAttempt();
      return;
    }

    const response = await login(email, password);
    if (response.status !== 200) {
      setError('Invalid credentials.');
      trackFailedAttempt();
    } else {
      setSuccess('Login successful! Welcome back.');

      // Send email via EmailJS
      const templateParams = {
        to_email: email,
        message: 'Welcome back to Shyamaprabha Admin! You have successfully logged in.',
      };

      try {
        await emailjs.send(
          'service_82rb8vj', // replace
          'template_1jvk6io', // replace
          templateParams
        );
        console.log('Email sent successfully');
      } catch (err) {
        console.error('Error sending email:', err);
        setError('Login successful, but failed to send email.');
      }

      // Clear localStorage
      localStorage.clear();
    }
  };

  const trackFailedAttempt = () => {
    setLoginAttempts((prev) => {
      const newAttempts = prev + 1;
      if (newAttempts >= 3) {
        setIsTimedOut(true);
        const newTimeout = 60 * timeoutMultiplier;
        setTimeoutSeconds(newTimeout);
        localStorage.setItem('timeoutEnd', (Date.now() + newTimeout * 1000).toString());
        setTimeoutMultiplier((prev) => prev * 2);
      }
      return newAttempts;
    });
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

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-xl">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="example@gmail.com"
                  disabled={isTimedOut}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="********"
                  disabled={isTimedOut}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>
          </div>

          {error && <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center bg-green-50 p-2 rounded-lg">{success}</div>}

         <button
  type="submit"
  disabled={isLoading || isTimedOut || !email || !password}  //disabl buton when email and password is not there
  className="w-full py-2 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-blue-500 to-purple-600 disabled:opacity-50"
>
  {isLoading
    ? 'Signing in...'
    : isTimedOut
    ? `Locked! Wait ${timeoutSeconds}s`
    : 'Sign In'}
</button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
