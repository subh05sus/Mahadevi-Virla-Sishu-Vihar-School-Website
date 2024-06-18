/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import * as apiClient from '../api-client';

const AdminRegistrations: React.FC = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const data = await apiClient.getRegistrations();
        setRegistrations(data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        // Handle error fetching data
      }
    };
    fetchRegistrations();
  }, []);

  const filteredRegistrations = registrations.filter(
    reg =>
      reg.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registrations</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Search by club name, event name, student name, phone or email"
      />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {filteredRegistrations.map((reg, index) => (
          <div key={index} className="bg-white border p-4 rounded-2xl relative">
            <p className='absolute top-0 right-0 m-2 bg-gray-500 rounded-full py-1 px-2 text-xs text-white'><strong></strong> {reg.clubName}</p>
            <p><strong>Event:</strong> {reg.eventName}</p>
            <p><strong>Student Name:</strong> {reg.studentName}</p>
            <p><strong>Phone:</strong> {reg.phone}</p>
            <p><strong>Email:</strong> {reg.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRegistrations;
