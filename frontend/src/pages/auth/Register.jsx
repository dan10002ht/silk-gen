import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { register as registerAction, clearError } from '@/store/slices/authSlice';
import { AuthLayout } from '@/components/templates';
import AuthForm from '@/components/molecules/AuthForm';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async data => {
    const result = await dispatch(registerAction(data));
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
        initialData={{ email: '', password: '', firstName: '', lastName: '' }}
        onSubmit={handleSubmit}
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
