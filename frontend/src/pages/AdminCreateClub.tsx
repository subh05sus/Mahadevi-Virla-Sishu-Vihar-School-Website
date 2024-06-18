// src/components/AdminCreateClub.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as apiClient from '../api-client';

const AdminCreateClub: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTeacher, setAssignedTeacher] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('assignedTeacher', assignedTeacher);
    if (image) {
      formData.append('image', image);
    }
    try {
      await apiClient.createClub(formData);
      navigate('/admin');
    } catch (error) {
      console.error('Failed to create club:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Club</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Assigned Teacher</label>
          <input
            type="text"
            value={assignedTeacher}
            onChange={(e) => setAssignedTeacher(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Create Club</button>
      </form>
    </div>
  );
};

export default AdminCreateClub;
