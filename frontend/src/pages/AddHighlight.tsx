import React, { useState } from 'react';
import * as apiClient from '../api-client';
import AdminHighlightsPage from '../components/AdminHighlights';

const AddHighlightForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      if (!image) {
        throw new Error('Please select an image.');
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', image as Blob);
      formData.append('content', content);

      await apiClient.createHighlight(formData);
      // Clear form fields
      setTitle('');
      setImage(null);
      setContent('');
      alert('Highlight added successfully!');
    } catch (error) {
      console.error('Error adding highlight:', error);
      alert('Failed to add highlight. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Highlight</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add Highlight
        </button>
      </form>

      <AdminHighlightsPage/>
    </div>
  );
};

export default AddHighlightForm;
