import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const AuthLayout = ({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkText,
  isLoginPage,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        {/* Logo or App Name */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Thuyen Silk</h1>
          <p className="text-gray-500 mt-2">Inventory Management System</p>
        </div>

        <Card className="shadow-lg">
          <Card.Header className="space-y-1 pb-2">
            <Card.Title className="text-2xl font-bold text-center">{title}</Card.Title>
            {subtitle && <Card.Description className="text-center">{subtitle}</Card.Description>}
          </Card.Header>

          <Card.Content>{children}</Card.Content>

          <Card.Footer className="flex flex-col space-y-4 pb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M13.774 10.1207L13.4347 11H16.25H20V15.25C20 17.0448 18.5448 18.5 16.75 18.5H7.25C5.45507 18.5 4 17.0449 4 15.25V8.75C4 6.95507 5.45507 5.5 7.25 5.5H16.75C18.5449 5.5 20 6.95507 20 8.75V10H16.25H13.774ZM6.75 8.5H11.25V10H6.75V8.5ZM6.75 12.5H9.25V14H6.75V12.5Z" />
                </svg>
                SSO
              </button>
            </div>

            {footerText && (
              <div className="text-center text-sm mt-4">
                {footerText}{' '}
                <Link to={footerLink} className="font-medium text-indigo-600 hover:text-indigo-500">
                  {footerLinkText}
                </Link>
              </div>
            )}
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  footerText: PropTypes.string,
  footerLink: PropTypes.string,
  footerLinkText: PropTypes.string,
  isLoginPage: PropTypes.bool,
};

export default AuthLayout;
