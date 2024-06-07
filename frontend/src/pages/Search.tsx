import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
// import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import { isMobile } from "react-device-detect";
// import AmenitiesFilter from "../components/AmenitiesFilter";
const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  // const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  // const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedFacilities, ] = useState<string[]>([]);
  const [selectedAmenities, ] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleToggleFilters = () => {
    setIsFiltersOpen((prevState) => !prevState);
  };
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    amenities: selectedAmenities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType)
    );
  };

  // const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const facility = event.target.value;

  //   setSelectedFacilities((prevFacilities) =>
  //     event.target.checked
  //       ? [...prevFacilities, facility]
  //       : prevFacilities.filter((prevFacility) => prevFacility !== facility)
  //   );
  // };
  // const handleAmenityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const amenity = event.target.value;

  //   setSelectedAmenities((prevAmenities) =>
  //     event.target.checked
  //       ? [...prevAmenities, amenity]
  //       : prevAmenities.filter((prevAmenity) => prevAmenity !== amenity)
  //   );
  // };

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-[250px,1fr] xl:grid-cols-[250px,1fr]">
      {!isMobile && (
        <div className="md:col-span-1 lg:col-span-1 xl:col-span-1 rounded-lg border border-slate-300 p-5 h-fit sticky top-10 portrait:relative">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-2">
              Filter by:
            </h3>
            <StarRatingFilter
              selectedStars={selectedStars}
              onChange={handleStarsChange}
            />
            <HotelTypesFilter
              selectedHotelTypes={selectedHotelTypes}
              onChange={handleHotelTypeChange}
            />
            {/* <FacilitiesFilter
              selectedFacilities={selectedFacilities}
              onChange={handleFacilityChange}
            />
            <AmenitiesFilter
              selectedAmenities={selectedAmenities}
              onChange={handleAmenityChange}
            /> */}
            <PriceFilter
              selectedPrice={selectedPrice}
              onChange={(value?: number) => setSelectedPrice(value)}
            />
          </div>
        </div>
      )}

      <div className="col-span-1 flex flex-col gap-5">
        <div className="flex justify-between items-center portrait:flex-col portrait:gap-2">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Destinations found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <div className="portrait:flex portrait:gap-2">
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Sort By</option>
              <option value="starRating">Star Rating</option>
              <option value="pricePerNightAsc">
                Price Per Night (low to high)
              </option>
              <option value="pricePerNightDesc">
                Price Per Night (high to low)
              </option>
            </select>

            {isMobile && (<button
              onClick={handleToggleFilters}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Filters
            </button>)}
          </div>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} key={hotel._id} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
      {/* Popup for filters */}
      {isFiltersOpen && isMobile && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
          <div className="bg-white rounded-lg m-2 p-2 max-h-[95vh] max-w-[95vw] flex flex-col gap-1">
            <StarRatingFilter
              selectedStars={selectedStars}
              onChange={handleStarsChange}
            />
            <HotelTypesFilter
              selectedHotelTypes={selectedHotelTypes}
              onChange={handleHotelTypeChange}
            />
            {/* <FacilitiesFilter
              selectedFacilities={selectedFacilities}
              onChange={handleFacilityChange}
            />
            <AmenitiesFilter
              selectedAmenities={selectedAmenities}
              onChange={handleFacilityChange}
            /> */}
            <PriceFilter
              selectedPrice={selectedPrice}
              onChange={(value?: number) => setSelectedPrice(value)}
            />
            {/* Close button */}
            <button
              onClick={handleToggleFilters}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
