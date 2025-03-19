import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { register, clearError } from '@/store/slices/authSlice';
import { AuthLayout } from '@/components/templates';
import AuthForm from '@/components/molecules/AuthForm';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await dispatch(register(formData));
    if (!result.error) {
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Enter your information to create your account"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Sign in"
    >
      <AuthForm
        isRegister
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        onClearError={() => dispatch(clearError())}
      />
    </AuthLayout>
  );
};

// Since this is a page component, no props are expected, but we define PropTypes for consistency
Register.propTypes = {};

export default Register;
