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
    <div className="relative flex flex-col justify-center items-center p-4 min-h-screen bg-gradient-to-br from-tertiary/30 via-accent to-white sm:p-6 md:p-8">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-primary/10 to-secondary/10 -z-10"></div>
      <div className="absolute top-12 right-12 w-32 h-32 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 blur-xl -z-10"></div>
      <div className="absolute bottom-12 left-12 w-40 h-40 rounded-full bg-gradient-to-bl from-tertiary/20 to-primary/10 blur-xl -z-10"></div>

      <div className="w-full max-w-md z-10">
        {/* Logo or App Name */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary drop-shadow-md">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Thuyen Silk
            </span>
          </h1>
          <p className="mt-2 font-medium text-tertiary-foreground">Inventory Management System</p>
        </div>

        <Card className="overflow-hidden rounded-xl border border-tertiary/30 shadow-2xl relative backdrop-blur-sm bg-white/90">
          <div className="h-2 bg-gradient-to-r from-primary via-secondary to-tertiary"></div>
          <Card.Header className="pt-6 pb-2 space-y-2">
            <Card.Title className="text-2xl font-bold text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-hover to-primary">
                {title}
              </span>
            </Card.Title>
            {subtitle && (
              <Card.Description className="text-center text-tertiary-foreground">
                {subtitle}
              </Card.Description>
            )}
          </Card.Header>

          <Card.Content className="px-6 py-4">{children}</Card.Content>

          <Card.Footer className="flex flex-col px-6 pb-6 space-y-4">
            {footerText && (
              <div className="mt-4 text-sm text-center">
                {footerText}{' '}
                <Link
                  to={footerLink}
                  className="font-medium text-primary hover:text-primary-hover underline-offset-4 hover:underline"
                >
                  {footerLinkText}
                </Link>
              </div>
            )}
          </Card.Footer>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>© 2023 Thuyen Silk. All rights reserved.</p>
        </div>
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
