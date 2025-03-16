import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "@/components/atoms/FormInput/FormInput";
import AuthCard from "@/components/molecules/AuthCard/AuthCard";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    const newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add your registration logic here
    console.log("Register form submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center p-4 min-h-screen bg-gray-50">
      <AuthCard title="Create an Account">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            placeholder="Enter your full name"
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            placeholder="Enter your email"
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            placeholder="Create a password"
          />

          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
            placeholder="Confirm your password"
          />

          <Button type="submit" className="w-full">
            Register
          </Button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              Login here
            </Link>
          </p>
        </form>
      </AuthCard>
    </div>
  );
};

export default Register;
