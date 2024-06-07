import React, { useState } from "react";
import * as apiClient from '../api-client';

const UploadDestination = () => {
  const [featuredText, setFeaturedText] = useState("");
  const [ButtonLink, setButtonLink] = useState("");
  const [carouselImage, setCarouselImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!carouselImage ) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("featuredText", featuredText);
    formData.append("ButtonLink", ButtonLink);
    formData.append("carouselImage", carouselImage);

    try {
      const response = await apiClient.uploadCarouselImage(formData);
      console.log("Featured Image added successfully:", response);
      alert("Featured Image added successfully");
    } catch (error) {
      console.error("Failed to add Featured Image:", error);
      alert("Failed to add Featured Image. Please try again later.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setCarouselImage(files[0]);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Upload Featured</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="featuredText" className="block font-medium text-gray-700">Featured Text</label>
          <input
            type="text"
            id="featuredText"
            value={featuredText}
            onChange={(e) => setFeaturedText(e.target.value)}
            className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ButtonLink" className="block font-medium text-gray-700">Button Link:</label>
          <input
            type="text"
            id="ButtonLink"
            value={ButtonLink}
            onChange={(e) => setButtonLink(e.target.value)}
            className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="carouselImage" className="block font-medium text-gray-700">Carousel Image:</label>
          <input
            type="file"
            id="carouselImage"
            accept="image/png, image/jpeg, image/svg+xml"
            onChange={handleImageChange}
            className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button type="submit" className="block bg-black text-white py-2 px-4 rounded-md">Add</button>
      </form>
    </div>
  );
};

export default UploadDestination;
