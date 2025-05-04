'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUpUserMutation } from '@/state/api';
import { setCredentials } from '@/state/authSlice';
import { useAppDispatch } from '@/app/redux';
import { ApiError } from '@/app/types/types';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';
import Link from 'next/link';

type Props = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Signup = ({ setLogin }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signupUser, { isLoading }] = useSignUpUserMutation();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = 'Full name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!validateEmail(formData.email))
      newErrors.email = 'Invalid email address.';

    if (!formData.password) newErrors.password = 'Password is required.';
    else if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters.';

    if (!formData.confirmPassword)
      newErrors.confirmPassword = 'Confirm your password.';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await signupUser({
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      dispatch(setCredentials({ user: result.user, token: result.token }));
      router.push('/dashboard');
    } catch (err) {
      const apiErr = err as ApiError;
      setErrors({
        api: apiErr?.data?.error || apiErr?.error || 'Signup failed.',
      });
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center p-4">
        <img
          className="hidden lg:block fixed top-0 left-0 w-full h-full object-cover opacity-100 z-0"
          src="./signin.avif"
          alt="Sign In"
        />
      </div>

      <div className="min-h-screen flex items-center justify-center p-4 fixed top-0 left-0 w-full h-full object-cover z-1 from-indigo-100 via-purple-50 to-pink-100 shadow-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-4">
              Create an account
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Join us today and get started
            </p>

            {errors.api && (
              <p className="text-sm text-red-600 text-center mb-4">
                {errors.api}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <Input
                label="Full Name"
                name="fullName"
                icon={<User className="h-5 w-5 text-gray-400" />}
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                placeholder="John Doe"
              />

              {/* Email */}
              <Input
                label="Email"
                name="email"
                type="email"
                icon={<Mail className="h-5 w-5 text-gray-400" />}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
              />

              {/* Password */}
              <Input
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                icon={<Lock className="h-5 w-5 text-gray-400" />}
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="••••••••"
                toggleIcon={showPassword ? <EyeOff /> : <Eye />}
                onToggle={() => setShowPassword(!showPassword)}
              />

              {/* Confirm Password */}
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                icon={<Lock className="h-5 w-5 text-gray-400" />}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="••••••••"
                toggleIcon={showConfirmPassword ? <EyeOff /> : <Eye />}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-4 w-4 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
                    />
                  </svg>
                ) : (
                  <>
                    Sign up
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                className="text-blue-600 hover:underline font-medium"
                onClick={() => setLogin(true)}
              >
                Log in
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

type InputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon: React.ReactNode;
  placeholder?: string;
  toggleIcon?: React.ReactNode;
  onToggle?: () => void;
};

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  icon,
  placeholder,
  toggleIcon,
  onToggle,
}: InputProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full pl-10 pr-10 py-3 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
      />
      {toggleIcon && onToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {toggleIcon}
        </button>
      )}
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);
