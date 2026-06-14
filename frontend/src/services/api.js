import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);

export const getProfile = () => API.get('/volunteer/profile');
export const updateProfile = (data) => API.put('/volunteer/profile', data);
export const getEvents = () => API.get('/volunteer/events');
export const joinEvent = (eventId) => API.post(`/volunteer/events/${eventId}/join`);
export const getMyEvents = () => API.get('/volunteer/my-events');

export const getAllVolunteers = () => API.get('/admin/volunteers');
export const deleteVolunteer = (id) => API.delete(`/admin/volunteers/${id}`);
export const getAllEvents = () => API.get('/admin/events');
export const createEvent = (data) => API.post('/admin/events', data);
export const updateEvent = (id, data) => API.put(`/admin/events/${id}`, data);
export const deleteEvent = (id) => API.delete(`/admin/events/${id}`);

export default API;