import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  infantCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const navigate = useNavigate();
  

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
      infantCount:search.infantCount
    },
  });

  // const checkIn = watch("checkIn");
  // const checkOut = watch("checkOut");
  const [checkIn, setCheckIn] = useState<Date>(watch("checkIn"));
  const [checkOut, setCheckOut] = useState<Date>(watch("checkOut"));
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const handleCheckInChange = (date: Date | null) => {
    setCheckIn(date as Date);
    setValue("checkIn", date as Date);
    if (date) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      const newCheckOut = checkOut < nextDay ? nextDay : checkOut;
      setCheckOut(newCheckOut);
      setValue("checkOut", newCheckOut as Date);

    }
  };

  const handleCheckOutChange = (date: Date | null) => {
    setCheckOut(date as Date);
    setValue("checkOut", date as Date);
  };



  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
      data.infantCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-yogvan-light rounded-lg gap-4">
      <h3 className="text-md font-bold">₹{pricePerNight}</h3>
      <form
        onSubmit={
          // isLoggedIn ? 
          handleSubmit(onSubmit)
          //  : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={handleCheckInChange}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
              dateFormat={`dd/MM/yyyy`}
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={handleCheckOutChange}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
              dateFormat={`dd/MM/yyyy`}
            />
          </div>
          <div className="flex bg-white px-2 py-1 gap-2 text-sm">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
            <label className="items-center flex">
              Infant:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("infantCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
            <button className="bg-black text-white h-full p-2 font-bold hover:bg-gray-800 text-xl">
              Book Now
            </button>
          {/* {isLoggedIn ? (
            <button className="bg-black text-white h-full p-2 font-bold hover:bg-gray-800 text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-black text-white h-full p-2 font-bold hover:bg-gray-800 text-xl">
              Sign in to Book
            </button>
          )} */}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
