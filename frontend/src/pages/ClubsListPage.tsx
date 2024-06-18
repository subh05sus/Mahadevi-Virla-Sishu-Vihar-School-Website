/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/ClubsListPage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllClubs } from '../api-client';

const ClubsListPage: React.FC = () => {
  const [clubs, setClubs] = useState<any[]>([]); // Update any[] as per your Club interface

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const data = await getAllClubs();
        setClubs(data);
      } catch (error) {
        console.error('Failed to fetch clubs:', error);
        // Handle error gracefully (e.g., show error message)
      }
    };

    fetchClubs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">All Clubs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clubs.map((club) => (
          <div key={club._id} className="bg-white border p-4 rounded-xl hover:bg-gray-100">
            <h2 className="text-xl font-semibold mb-2">{club.name}</h2>
            <p className="text-gray-600 mb-2">{club.description}</p>
            <Link to={`/clubs/${club._id}`} className="mt-2 inline-block bg-gray-600 text-white px-4 py-2 rounded">
              View Club Details
            </Link>
          </div>
        ))}
        {clubs.length === 0 && (
          <p className="text-gray-600">No clubs found.</p>
        )}
      </div>
    </div>
  );
};

export default ClubsListPage;
