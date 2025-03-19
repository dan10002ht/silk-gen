import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

const AuthForm = ({
  isRegister,
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
  onClearError,
}) => {
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const validatePassword = (e) => {
    const password = e.target.value;
    
    if (isRegister && password.length > 0) {
      if (password.length < 8) {
        setPasswordError('Password must be at least 8 characters');
      } else if (!/[A-Z]/.test(password)) {
        setPasswordError('Password must contain at least one uppercase letter');
      } else if (!/[a-z]/.test(password)) {
        setPasswordError('Password must contain at least one lowercase letter');
      } else if (!/[0-9]/.test(password)) {
        setPasswordError('Password must contain at least one number');
      } else {
        setPasswordError('');
      }
    } else {
      setPasswordError('');
    }

    handleChange(e);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (isRegister && passwordError) {
      return;
    }
    
    // Include rememberMe in the submit if needed
    handleSubmit(e, rememberMe);
  };

  return (
    <>
      {error && (
        <Alert variant="destructive" onClose={onClearError} className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-4">
        {isRegister && (
          <>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                required
                value={formData.firstName || ''}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                required
                value={formData.lastName || ''}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            value={formData.email || ''}
            onChange={handleChange}
            className="w-full"
            autoComplete={isRegister ? 'email' : 'username'}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            {!isRegister && (
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            )}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder={isRegister ? 'Create a strong password' : 'Enter your password'}
            required
            value={formData.password || ''}
            onChange={validatePassword}
            className={`w-full ${passwordError ? 'border-red-500' : ''}`}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
          />
          {passwordError && (
            <p className="mt-1 text-sm text-red-600">{passwordError}</p>
          )}
        </div>

        {!isRegister && (
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
        )}

        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full py-2" 
            disabled={loading || (isRegister && passwordError)}
          >
            {loading 
              ? (isRegister ? 'Creating Account...' : 'Signing In...') 
              : (isRegister ? 'Create Account' : 'Sign In')}
          </Button>
        </div>
      </form>
    </>
  );
};

AuthForm.propTypes = {
  isRegister: PropTypes.bool,
  formData: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onClearError: PropTypes.func,
};

AuthForm.defaultProps = {
  isRegister: false,
  loading: false,
};

export default AuthForm;
