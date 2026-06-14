import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <div className="space-y-5">
          <div>
            <p className="font-semibold">
              Email
            </p>

            <p className="text-gray-600 dark:text-gray-300">
              {user.email}
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Role
            </p>

            <p className="text-gray-600 dark:text-gray-300">
              {user.role}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;