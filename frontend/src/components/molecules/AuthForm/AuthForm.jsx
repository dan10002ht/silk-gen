import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { loginSchema, registerSchema } from '@/lib/validations/auth';
import { AtSign, Lock, User, LogIn, UserPlus } from 'lucide-react';

const AuthForm = ({ isRegister, initialData, onSubmit, loading, error, onClearError }) => {
  // Set up React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
    defaultValues: initialData || {},
  });

  // Handle form submission
  const processSubmit = data => {
    onSubmit(data);
  };

  return (
    <>
      {error && (
        <Alert variant="destructive" onClose={onClearError} className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(processSubmit)} className="space-y-4">
        {isRegister && (
          <>
            <div>
              <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <User size={16} />
                </div>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  type="text"
                  placeholder="John"
                  className={`w-full pl-10 ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary/50'}`}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <User size={16} />
                </div>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  type="text"
                  placeholder="Doe"
                  className={`w-full pl-10 ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary/50'}`}
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </>
        )}

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <AtSign size={16} />
            </div>
            <Input
              id="email"
              {...register('email')}
              type="email"
              placeholder="name@example.com"
              className={`w-full pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary/50'}`}
              autoComplete={isRegister ? 'email' : 'username'}
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            {!isRegister && (
              <a
                href="#"
                className="text-sm font-medium text-primary hover:text-primary-hover hover:underline"
              >
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <Lock size={16} />
            </div>
            <Input
              id="password"
              {...register('password')}
              type="password"
              placeholder={isRegister ? 'Create a strong password' : 'Enter your password'}
              className={`w-full pl-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary/50'}`}
              autoComplete={isRegister ? 'new-password' : 'current-password'}
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {!isRegister && (
          <div className="flex items-center">
            <input
              id="rememberMe"
              {...register('rememberMe')}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="rememberMe" className="block ml-2 text-sm text-gray-700">
              Remember me
            </label>
          </div>
        )}

        <div className="pt-6">
          <Button
            type="submit"
            className={`py-2 w-full ${isRegister ? 'bg-gradient-to-r from-secondary to-primary' : 'bg-gradient-to-r from-primary to-primary-hover'}`}
            disabled={loading}
            size="xl"
          >
            <span className="flex items-center justify-center">
              {loading ? (
                <span className="inline-flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {isRegister ? 'Creating Account...' : 'Signing In...'}
                </span>
              ) : (
                <span className="inline-flex items-center">
                  {isRegister ? (
                    <UserPlus size={18} className="mr-2" />
                  ) : (
                    <LogIn size={18} className="mr-2" />
                  )}
                  <span className="font-semibold">{isRegister ? 'Create Account' : 'Sign In'}</span>
                </span>
              )}
            </span>
          </Button>
        </div>
      </form>
    </>
  );
};

AuthForm.propTypes = {
  isRegister: PropTypes.bool,
  initialData: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    rememberMe: PropTypes.bool,
  }),
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onClearError: PropTypes.func,
};

AuthForm.defaultProps = {
  isRegister: false,
  loading: false,
  initialData: {},
};

export default AuthForm;
