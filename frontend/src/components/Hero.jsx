import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Volunteer for Change
          </h1>
          <p className="text-xl mb-8">
            Join NayePankh Foundation and make a real difference in your community. 
            Your time and skills can change lives.
          </p>
          <div className="space-x-4">
            <Link to="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get Started
            </Link>
            <Link to="/login" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Existing Member
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;