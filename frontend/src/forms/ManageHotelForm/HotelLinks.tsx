import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const HotelLinks = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Add Property Links</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Booking.com
        <input
          type="text"
          className="border rounded w-full p-2 font-normal"
          {...register("bookingdotcom")}
        ></input>
        {errors.bookingdotcom && (
          <span className="text-red-500">{errors.bookingdotcom.message}</span>
        )}
      </label>
      

      <label className="text-gray-700 text-sm font-bold flex-1">
        Airbnb
        <input
          type="text"
          className="border rounded w-full p-2 font-normal"
          {...register("airbnb")}
        ></input>
        {errors.airbnb && (
          <span className="text-red-500">{errors.airbnb.message}</span>
        )}
      </label>
      

      <label className="text-gray-700 text-sm font-bold flex-1">
        MakeMyTrip
        <input
          type="text"
          className="border rounded w-full p-2 font-normal"
          {...register("makemytrip")}
        ></input>
        {errors.makemytrip && (
          <span className="text-red-500">{errors.makemytrip.message}</span>
        )}
      </label>
      

      <label className="text-gray-700 text-sm font-bold flex-1">
        Google Travels
        <input
          type="text"
          className="border rounded w-full p-2 font-normal"
          {...register("googleTravels")}
        ></input>
        {errors.googleTravels && (
          <span className="text-red-500">{errors.googleTravels.message}</span>
        )}
      </label>
      

      <label className="text-gray-700 text-sm font-bold flex-1">
        Agoda
        <input
          type="text"
          className="border rounded w-full p-2 font-normal"
          {...register("agoda")}
        ></input>
        {errors.agoda && (
          <span className="text-red-500">{errors.agoda.message}</span>
        )}
      </label>
      

    </div>
  );
};

export default HotelLinks;