import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/atoms/Button/Button";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user.email}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-gray-600">
            This is a protected page. You can only see this if you're logged in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
