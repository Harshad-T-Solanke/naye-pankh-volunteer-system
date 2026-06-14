import { useEffect, useState } from 'react';
import { getProfile, getEvents, joinEvent, getMyEvents } from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, eventsRes, myEventsRes] = await Promise.all([
        getProfile(),
        getEvents(),
        getMyEvents()
      ]);
      setProfile(profileRes.data);
      setUpcomingEvents(eventsRes.data);
      setMyEvents(myEventsRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = async (eventId) => {
    try {
      await joinEvent(eventId);
      toast.success('Successfully joined event!');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to join');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
      
     
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <p><strong>Name:</strong> {profile?.fullName}</p>
          <p><strong>Email:</strong> {profile?.email}</p>
          <p><strong>Phone:</strong> {profile?.phone || 'Not provided'}</p>
          <p><strong>Total Hours:</strong> {profile?.totalHours || 0} hours</p>
          <p><strong>Skills:</strong> {profile?.skills?.join(', ') || 'None'}</p>
          <p><strong>Availability:</strong> {profile?.availability || 'Not specified'}</p>
        </div>
      </div>
      
      
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4">My Events</h2>
        {myEvents.length === 0 ? (
          <p className="text-gray-500">You haven't joined any events yet.</p>
        ) : (
          <div className="space-y-3">
            {myEvents.map(event => (
              <div key={event._id} className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date} at {event.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {upcomingEvents.map(event => (
            <div key={event._id} className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2">📅 {event.date}</p>
              <p className="text-gray-600 mb-4">📍 {event.location}</p>
              <button
                onClick={() => handleJoinEvent(event._id)}
                className="btn-primary w-full"
              >
                Join Event
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;