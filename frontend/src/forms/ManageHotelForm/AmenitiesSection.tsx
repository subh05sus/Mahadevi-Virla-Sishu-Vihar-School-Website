import { useFormContext } from "react-hook-form";
import { hotelAmenities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const AmenitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Amenities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelAmenities.map((amenity) => (
          <label className="text-sm flex gap-1 items-center text-gray-700" key={amenity}>
            <input
              type="checkbox"
              value={amenity}
              key={amenity}
              {...register("amenities", {
                validate: (amenities) => {
                  if (amenities && amenities.length > 0) {
                    return true;
                  } else {
                    return "At least one amenity is required";
                  }
                },
              })}
            />
            {amenity}
          </label>
        ))}
      </div>
      {errors.amenities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.amenities.message}
        </span>
      )}
    </div>
  );
};

export default AmenitiesSection;
