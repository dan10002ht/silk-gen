import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login, clearError } from '@/store/slices/authSlice';
import { AuthLayout } from '@/components/templates';
import AuthForm from '@/components/molecules/AuthForm';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async data => {
    const result = await dispatch(login(data));
    if (!result.error) {
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your credentials to access your account"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Sign up"
      isLoginPage
    >
      <AuthForm
        initialData={{ email: '', password: '', rememberMe: false }}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        onClearError={() => dispatch(clearError())}
      />
    </AuthLayout>
  );
};

// Since this is a page component, no props are expected, but we define PropTypes for consistency
Login.propTypes = {};

export default Login;
