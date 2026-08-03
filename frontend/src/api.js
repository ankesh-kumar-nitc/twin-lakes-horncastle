import axios from 'axios';

const BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const api = axios.create({ baseURL: BASE, headers: { 'Content-Type': 'application/json' } });

export const getRooms = () => api.get('/rooms').then(r => r.data);
export const getRoomAvailability = (roomId) => api.get(`/rooms/${roomId}/availability`).then(r => r.data);
export const bookRoom = (roomId, payload) => api.post(`/rooms/${roomId}/bookings`, payload).then(r => r.data);

export const bookDayTicket = (payload) => api.post('/day-tickets', payload).then(r => r.data);

export const getSyndicateStatus = () => api.get('/syndicate/status').then(r => r.data);
export const applySyndicate = (payload) => api.post('/syndicate/apply', payload).then(r => r.data);

export const sendContact = (payload) => api.post('/contact', payload).then(r => r.data);

export const errMessage = (e) => {
  if (e?.response?.data?.detail) return e.response.data.detail;
  return e?.message || 'Something went wrong.';
};
