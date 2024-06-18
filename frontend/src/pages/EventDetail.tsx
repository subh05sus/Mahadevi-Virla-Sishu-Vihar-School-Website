/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/EventDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';

const EventDetails: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<any>(null);
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clubId, setClubId] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const data = await apiClient.getEventDetails(eventId!);
        setEvent(data.event);
        setClubId(data.clubId)
      } catch (err) {
        setError('Failed to fetch event details.');
        console.error('Error fetching event details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.registerForEvent(clubId, eventId!, { studentName,phone, email });
      alert('Registered successfully');
    } catch (err) {
      console.error('Failed to register for event:', err);
      alert('Failed to register for event. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>No event found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{event.heading}</h1>
      <p className="mb-1.5">{new Date(event.date).toLocaleDateString()}</p>
      <p className="mb-1.5"><strong>Time:</strong> {event.time}</p>
      <p className="mb-4"><strong>Place:</strong> {event.place}</p>
      <p className="mb-4">{event.content}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Topics</h2>
        <ul className="flex flex-wrap gap-2">
          {event.topics.map((topic: string, index: number) => (
            <li key={index} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full border border-gray-300">
              {topic}
            </li>
          ))}
        </ul>

      </div>
      <form onSubmit={handleRegistration}>
        <div className="mb-4">
          <label className="block mb-1">Student Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Phone</label>
          <input
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Register</button>
      </form>
    </div>
  );
};

export default EventDetails;
