import { useState, useEffect } from "react";
import * as apiClient from "../api-client";
import { CarouselImageType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

const ImageGalleryPage = () => {
  const [images, setImages] = useState<CarouselImageType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await apiClient.fetchCarouselImages();
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.deleteCarouselImage(id);
      setImages(images.filter((image) => image._id !== id));
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };



  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between flex-wrap">
        <h2 className="font-bold text-2xl mb-4">Carousel Image Gallery</h2>
        <div className="mb-4">
          <Link
            to='/upload-featured'
            className="hover:bg-gray-700 bg-gray-900  text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Upload Featured
          </Link>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-3 portrait:grid-cols-1 gap-2">
        {images.map((image) => (
          <div
            key={image._id}
            className="border rounded-md p-2 flex flex-col justify-end"
          >
            <img
              src={image.imageUrl}
              alt={`Carousel image ${image._id}`}
              className="w-full h-auto"
            />
            <button
              onClick={() => handleDelete(image._id)}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGalleryPage;
