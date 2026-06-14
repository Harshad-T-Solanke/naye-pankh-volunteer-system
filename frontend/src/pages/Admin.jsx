import { useEffect, useState } from 'react';
import { getAllVolunteers, deleteVolunteer, getAllEvents, createEvent, deleteEvent } from '../services/api';
import toast from 'react-hot-toast';

const Admin = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxVolunteers: 50
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [volRes, eventRes] = await Promise.all([
        getAllVolunteers(),
        getAllEvents()
      ]);
      setVolunteers(volRes.data);
      setEvents(eventRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await createEvent(newEvent);
      toast.success('Event created!');
      setShowEventForm(false);
      setNewEvent({ title: '', description: '', date: '', location: '', maxVolunteers: 50 });
      fetchData();
    } catch (error) {
      toast.error('Failed to create event');
    }
  };

  const handleDeleteVolunteer = async (id) => {
    if (confirm('Delete this volunteer?')) {
      try {
        await deleteVolunteer(id);
        toast.success('Volunteer deleted');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleDeleteEvent = async (id) => {
    if (confirm('Delete this event?')) {
      try {
        await deleteEvent(id);
        toast.success('Event deleted');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="card text-center">
          <h3 className="text-gray-600 dark:text-gray-400">
            Total Volunteers
          </h3>

          <p className="text-3xl font-bold text-blue-600">
            {volunteers.length}
          </p>
        </div>

        <div className="card text-center">
          <h3 className="text-gray-600 dark:text-gray-400">
            Approved
          </h3>

          <p className="text-3xl font-bold text-green-600">
            {
              volunteers.filter(
                v => v.approved
              ).length
            }
          </p>
        </div>

        <div className="card text-center">
          <h3 className="text-gray-600 dark:text-gray-400">
            Total Events
          </h3>

          <p className="text-3xl font-bold text-purple-600">
            {events.length}
          </p>
        </div>

        <div className="card text-center">
          <h3 className="text-gray-600 dark:text-gray-400">
            Total Hours
          </h3>

          <p className="text-3xl font-bold text-orange-600">
            {
              volunteers.reduce(
                (sum, v) =>
                  sum + (v.totalHours || 0),
                0
              )
            }
          </p>

        </div>

      </div>

      <div className="mb-8">
        <button onClick={() => setShowEventForm(!showEventForm)} className="btn-primary">
          + Create New Event
        </button>
      </div>

      {showEventForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">Create Event</h2>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              className="input-field"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              className="input-field"
              rows="3"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              required
            />
            <input
              type="date"
              className="input-field"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Location"
              className="input-field"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Max Volunteers"
              className="input-field"
              value={newEvent.maxVolunteers}
              onChange={(e) => setNewEvent({ ...newEvent, maxVolunteers: e.target.value })}
            />
            <button type="submit" className="btn-primary">Create Event</button>
          </form>
        </div>
      )}

      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Manage Events</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Registered</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event._id} className="border-b dark:border-gray-700">
                  <td className="p-2">{event.title}</td>
                  <td className="p-2">{event.date}</td>
                  <td className="p-2">{event.location}</td>
                  <td className="p-2">{event.registered?.length || 0}/{event.maxVolunteers}</td>
                  <td className="p-2">
                    <button onClick={() => handleDeleteEvent(event._id)} className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <div className="card">
        <h2 className="text-xl font-bold mb-4">Volunteers Directory</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-left">Skills</th>
                <th className="p-2 text-left">Hours</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map(vol => (
                <tr key={vol._id} className="border-b dark:border-gray-700">
                  <td className="p-2">{vol.fullName}</td>
                  <td className="p-2">{vol.email}</td>
                  <td className="p-2">{vol.phone || '-'}</td>
                  <td className="p-2">{vol.skills?.slice(0, 2).join(', ') || '-'}</td>
                  <td className="p-2">{vol.totalHours || 0}</td>
                  <td className="p-2">
                    <button onClick={() => handleDeleteVolunteer(vol._id)} className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;