/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';

const HighlightDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [highlight, setHighlight] = useState<any>(null);

  useEffect(() => {
    fetchHighlightDetails();
  }, []);

  const fetchHighlightDetails = async () => {
    try {
      const data = await apiClient.getHighlightById(id as string);
      setHighlight(data);
    } catch (error) {
      console.error("Failed to fetch highlight details:", error);
    }
  };

  if (!highlight) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{highlight.title}</h1>
      <img src={highlight.imageUrl} alt={highlight.title} className="rounded-lg mb-4" />
      <p>{highlight.content}</p>
    </div>
  );
};

export default HighlightDetailsPage;
