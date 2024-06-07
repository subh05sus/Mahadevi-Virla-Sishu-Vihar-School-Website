/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import * as apiClient from '../api-client';

const AdminHighlightsPage: React.FC = () => {
  const [highlights, setHighlights] = useState<any[]>([]);

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    try {
      const data = await apiClient.getAllHighlights();
      setHighlights(data);
    } catch (error) {
      console.error("Failed to fetch highlights:", error);
    }
  };

  const handleDeleteHighlight = async (id: string) => {
    try {
      await apiClient.deleteHighlight(id);
      // Remove the deleted highlight from the state
      setHighlights(highlights.filter((highlight) => highlight._id !== id));
    } catch (error) {
      console.error("Failed to delete highlight:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Existing Highlights</h2>
      <div>
        {highlights.map((highlight) => (
          <div key={highlight._id} className="flex items-center justify-between bg-gray-200 rounded-md p-4 mb-4">
            <div>
              <h3 className="font-semibold">{highlight.title}</h3>
              <p className="text-gray-700 mt-2">{highlight.content}</p>
            </div>
            <button onClick={() => handleDeleteHighlight(highlight._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHighlightsPage;
