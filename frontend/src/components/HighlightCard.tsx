import React from 'react';
import { Link } from 'react-router-dom';

interface HighlightType {
  _id: string;
  title: string;
  imageUrl: string;
  content: string;
}

const HighlightCard: React.FC<HighlightType> = ({ _id, title, imageUrl, content }) => {
  const shortenedContent = content.length > 60 ? `${content.substring(0, 60)}...` : content;

  return (
    <div className="flex flex-col bg-gray-200 rounded-md p-4">
      <img src={imageUrl} alt={title} className="w-full h-40 rounded-md object-cover mb-4" />
      <h2 className="font-semibold text-xl mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{shortenedContent}</p>
      <Link to={`/highlights/${_id}`} className="text-blue-600 hover:underline">Read More</Link>
    </div>
  );
};

export default HighlightCard;
