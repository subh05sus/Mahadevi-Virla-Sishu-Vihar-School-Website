/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";
import { HotelType } from "../../../../backend/src/shared/types";
import { reviews, usernames } from "../../../../backend/src/shared/reviews";
import AmenitiesSection from "./AmenitiesSection";
import HotelLinks from "./HotelLinks";
export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  amenities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
  reviews: any;
  bookingdotcom: string;
  airbnb: string;
  makemytrip: string;
  googleTravels: string;
  agoda: string;
};

type Props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};
async function generateRandomReview(reviews: any, usernames: any) {
  const randomReviewIndex = Math.floor(Math.random() * reviews.length);
  const randomReview = reviews[randomReviewIndex];
  const randomUsernameIndex = Math.floor(Math.random() * usernames.length);
  const randomUsername = usernames[randomUsernameIndex];
  const randomStar = Math.random() < 0.1 ? 3 : Math.floor(Math.random() * 3) + 3;
  return {
    review: randomReview,
    name: randomUsername,
    rating: randomStar
  };
}

async function generateRandomReviews(reviews: any, usernames: any) {
  const numReviews = Math.floor(Math.random() * 3) + 8;
  const randomReviews = [];

  for (let i = 0; i < numReviews; i++) {
    const review = await generateRandomReview(reviews, usernames);
    randomReviews.push(review);
  }

  return randomReviews;
}

// Example usage


const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit(async (formDataJson: HotelFormData) => {
    const randomReviews = await generateRandomReviews(reviews, usernames);
    formDataJson.reviews = randomReviews;

    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
    // hotel links
    formData.append("bookingdotcom", formDataJson.bookingdotcom);
    formData.append("airbnb", formDataJson.airbnb);
    formData.append("makemytrip", formDataJson.makemytrip);
    formData.append("googleTravels", formDataJson.googleTravels);
    formData.append("agoda", formDataJson.agoda);

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });


    
    
    formDataJson.amenities.forEach((amenity, index) => {
      formData.append(`amenities[${index}]`, amenity);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });
    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <AmenitiesSection />
        <GuestsSection />
        <ImagesSection />
        <HotelLinks />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className=" text-white py-2 px-4 font-bold transition-all duration-200 hover:bg-yogvan-dark bg-yogvan rounded-md text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;