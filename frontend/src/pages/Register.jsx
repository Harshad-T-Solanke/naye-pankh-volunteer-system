import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    skills: '',
    availability: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    setLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        skills: formData.skills
          ? formData.skills.split(',').map((s) => s.trim())
          : [],
        availability: formData.availability || ''
      };

      const res = await register(payload);

      toast.success('Registration successful! Please login.');

      navigate('/login');

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto card">
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Join NayePankh Foundation
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name *"
            required
            className="input-field"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email *"
            required
            className="input-field"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password *"
            required
            className="input-field"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password *"
            required
            className="input-field"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="input-field"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            className="input-field"
            value={formData.skills}
            onChange={handleChange}
          />

          <input
            type="text"
            name="availability"
            placeholder="Availability"
            className="input-field"
            value={formData.availability}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>

        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;