import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">🌟 NayePankh</h3>
            <p className="text-gray-400">
              Empowering communities through volunteerism. Together, we can make a difference.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white">Register</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 info@nayepankh.org</li>
              <li>📞 +91 12345 67890</li>
              <li>📍 Mumbai, India</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-2xl">📘</a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">📷</a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">🐦</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} NayePankh Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;