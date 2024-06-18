/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/ManageClubsEventsPage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllClubs, deleteClub, deleteEvent } from '../api-client';

const ManageClubsEventsPage: React.FC = () => {
  const [clubs, setClubs] = useState<any[]>([]); // Update any as per your Club interface
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        const data = await getAllClubs();
        setClubs(data);
      } catch (error) {
        console.error('Failed to fetch clubs:', error);
        // Handle error gracefully (e.g., show error message)
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const handleDeleteClub = async (clubId: string) => {
    if (window.confirm('Are you sure you want to delete this club?')) {
      try {
        await deleteClub(clubId);
        setClubs(clubs.filter(club => club._id !== clubId));
        // Optionally show success message or update UI
      } catch (error) {
        console.error('Failed to delete club:', error);
        // Handle error gracefully (e.g., show error message)
      }
    }
  };

  const handleDeleteEvent = async (clubId: string, eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(clubId, eventId);
        const updatedClubs = [...clubs];
        const clubIndex = updatedClubs.findIndex(club => club._id === clubId);
        if (clubIndex !== -1) {
          updatedClubs[clubIndex].events = updatedClubs[clubIndex].events.filter((event: { _id: string; }) => event._id !== eventId);
          setClubs(updatedClubs);
        }
        // Optionally show success message or update UI
      } catch (error) {
        console.error('Failed to delete event:', error);
        // Handle error gracefully (e.g., show error message)
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Manage Clubs and Events</h1>
      {loading && <p>Loading...</p>}
      {!loading && clubs.length === 0 && (
        <p>No clubs found.</p>
      )}
      {!loading && clubs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clubs.map(club => (
            <div key={club._id} className="bg-white border p-4 rounded-xl">
              <h2 className="text-xl font-semibold mb-2">{club.name}</h2>
              <p className="text-gray-600 mb-2">{club.description}</p>
              <button onClick={() => handleDeleteClub(club._id)} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete Club</button>
              <Link to={`/clubs/${club._id}`} className="inline-block bg-gray-600 text-white px-4 py-2 rounded my-1">View Club Details</Link>
              <hr className="my-4" />
              <h3 className="text-lg font-semibold mb-2">Events</h3>
              {club.events.length === 0 && (
                <p>No events found.</p>
              )}
              {club.events.map((event: { _id: any; heading: any;}) => (
                <div key={event._id} className="mt-2">
                  <h4 className="text-lg font-semibold">{event.heading}</h4>
                  <button onClick={() => handleDeleteEvent(club._id, event._id)} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Delete Event</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageClubsEventsPage;
