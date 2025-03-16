import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-4 items-center">
            <span className="text-gray-600">Welcome, {user.email}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold">Welcome to Your Dashboard</h2>
          <p className="text-gray-600">
            This is a protected page. You can only see this if you're logged in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
