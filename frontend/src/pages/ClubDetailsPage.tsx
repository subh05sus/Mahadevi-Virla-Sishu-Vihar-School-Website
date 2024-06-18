/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/ClubDetailsPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClubDetails } from '../api-client';



const ClubDetailsPage: React.FC = () => {
  const { clubId } = useParams<{clubId: string;}>();
  const [club, setClub] = useState<any | null>(null); // Update any as per your Club interface

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const data = await getClubDetails(clubId!);
        setClub(data);
      } catch (error) {
        console.error(`Failed to fetch club details for club ID ${clubId}:`, error);
        // Handle error gracefully (e.g., show error message)
      }
    };

    fetchClubDetails();
  }, [clubId]);

  if (!club) {
    return (
      <div className="container mx-auto p-4">
        <p>Loading club details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{club.name}</h1>
      <div className="bg-white border p-4 rounded-xl">
        <p className="text-gray-600 mb-2">{club.description}</p>
        <p className="text-gray-600 mb-2">Assigned Teacher: {club.assignedTeacher}</p>
        <img src={club.imageUrl} alt="Club" className="mb-2" style={{ maxWidth: '100%' }} />
        <h2 className="text-xl font-semibold mb-2">Events</h2>
        <ul className="list-disc ml-4">
          {club.events.map((event: any) => ( // Update any as per your Event interface
            <li key={event._id}>
              <h3 className="text-lg font-semibold">{event.heading}</h3>
              <p>{event.content}</p>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Time: {event.time}</p>
              <p>Place: {event.place}</p>
              <p>Topics: {event.topics.join(', ')}</p>
            </li>
          ))}
          {club.events.length === 0 && (
            <p className="text-gray-600">No events found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ClubDetailsPage;
