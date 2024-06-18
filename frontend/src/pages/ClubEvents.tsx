/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ClubEvents.tsx
import React, { useState, useEffect } from 'react';
import * as apiClient from '../api-client';
import { Link } from 'react-router-dom';

const ClubEvents: React.FC = () => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [selectedClub, setSelectedClub] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchClubsAndEvents = async () => {
      try {
        const clubsData = await apiClient.getAllClubs();
        setClubs(clubsData);

        // Fetch all events across all clubs
        let allEvents: any[] = [];
        for (const club of clubsData) {
          const clubEvents = await apiClient.getClubEvents(club._id);
          allEvents = allEvents.concat(clubEvents);
        }
        setEvents(allEvents);
      } catch (error) {
        console.error('Failed to fetch clubs and events', error);
      }
    };

    fetchClubsAndEvents();
  }, []);

  const handleClubChange = async (clubId: string) => {
    setSelectedClub(clubId);
    if (clubId) {
      const clubEvents = await apiClient.getClubEvents(clubId);
      setEvents(clubEvents);
    } else {
      // Show all events if no club is selected
      let allEvents: any[] = [];
      for (const club of clubs) {
        const clubEvents = await apiClient.getClubEvents(club._id);
        allEvents = allEvents.concat(clubEvents);
      }
      setEvents(allEvents);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = events.filter(event =>
    event.heading.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const truncateContent = (content: string, maxLength: number) => {
    return content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Club Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        <div>
          <label className="block mb-1">Club</label>
          <select
            value={selectedClub}
            onChange={(e) => handleClubChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All Clubs</option>
            {clubs.map((club) => (
              <option key={club._id} value={club._id}>{club.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Search Events</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by event heading..."
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
        {filteredEvents.map((event) => (
          <div key={event._id} className="bg-white border p-4 rounded-xl hover:bg-gray-100">
            <h2 className="text-xl font-semibold mb-2">{event.heading}</h2>
            <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
            <p>{truncateContent(event.content, 250)}</p>
            <Link to={`/events/${event._id}`} className="mt-2 inline-block bg-gray-600 text-white px-4 py-2 rounded">View Details</Link>
          </div>
        ))}
        {filteredEvents.length === 0 && (
          <p className="text-gray-600">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default ClubEvents;
