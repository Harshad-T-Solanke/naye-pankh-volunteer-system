import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Volunteer With Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Make Impact</h3>
            <p className="text-gray-600 dark:text-gray-400">Directly contribute to community development.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Learn Skills</h3>
            <p className="text-gray-600 dark:text-gray-400">Gain valuable experience and develop skills.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Build Network</h3>
            <p className="text-gray-600 dark:text-gray-400">Connect with like-minded people.</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">

          <h2 className="text-3xl font-bold text-center mb-8">
            Demo Access
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">
                👤 Volunteer
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create a new account and login.
              </p>
              <Link
                to="/register"
                className="inline-block mt-4 btn-primary"
              >
                Register
              </Link>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">
                🛠 Admin Demo
              </h3>
              <p className="mb-2">
                Email:
                <br />
                <span className="font-semibold">
                  admin@nayepankh.org
                </span>
              </p>
              <p>
                Password:
                <br />
                <span className="font-semibold">
                  admin123
                </span>
              </p>
              <Link
                to="/login"
                className="inline-block mt-4 btn-primary"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 dark:bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-6">Join thousands of volunteers already making an impact.</p>
          <Link to="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Register Now
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;