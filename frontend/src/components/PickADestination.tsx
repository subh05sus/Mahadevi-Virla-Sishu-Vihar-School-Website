/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { DestinationType } from "../../../backend/src/shared/types";

function PickADestination() {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destinations, setDestinations] = useState<DestinationType[]>([]);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const data = await apiClient.getDestinations();
      setDestinations(data);
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    }
  };

  if (!destinations) {
    return <></>;
  }

  const handleButtonClick = (place: any) => {
    navigate("/search");
    search.saveSearchValues(
      place,
      search.checkIn,
      search.checkOut,
      search.adultCount,
      search.childCount,
      search.infantCount
    );
  };

  return (
    <div className="space-y-3 mb-12 select-none">
      <h1 className="font-bold text-3xl">Pick A Destination</h1>
      <div className="flex flex-wrap gap-x-20">
        {destinations.map((destination, index) => (
          <div key={index}>
            {destination.illustrationImageUrl && (
              <button
                className="flex flex-col text-center content-end items-center"
                style={{ height: "6rem", width: "4rem" }}
                onClick={() => handleButtonClick(destination.name)}
              >
                <img
                  src={destination.illustrationImageUrl}
                  alt={destination.name}
                />
                <span className="font-semibold text-base">
                  {destination.name}
                </span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PickADestination;
