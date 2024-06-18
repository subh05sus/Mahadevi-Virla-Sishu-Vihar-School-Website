/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/AdminAddEvent.tsx
// src/components/AdminAddEvent.tsx
import React, { useState, useEffect } from 'react';
import * as apiClient from '../api-client';

const AdminAddEvent: React.FC = () => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [selectedClub, setSelectedClub] = useState('');
  const [date, setDate] = useState('');
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [topics, setTopics] = useState<string[]>(['']);

  useEffect(() => {
    const fetchClubs = async () => {
      const data = await apiClient.getAllClubs();
      setClubs(data);
    };
    fetchClubs();
  }, []);

  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  const addTopicField = () => {
    setTopics([...topics, '']);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = { date, heading, content, time, place, topics };
    try {
      await apiClient.addEventToClub(selectedClub, eventData);
      alert('Event added successfully');
    } catch (error) {
      console.error('Failed to add event:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Club</label>
          <select
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a club</option>
            {clubs.map((club) => (
              <option key={club._id} value={club._id}>{club.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Heading</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Time</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Place</label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Topics</label>
          {topics.map((topic, index) => (
            <input
              key={index}
              type="text"
              value={topic}
              onChange={(e) => handleTopicChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
          ))}
          <button type="button" onClick={addTopicField} className="px-4 py-2 bg-green-600 text-white rounded">Add Topic</button>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add Event</button>
      </form>
    </div>
  );
};

export default AdminAddEvent;
