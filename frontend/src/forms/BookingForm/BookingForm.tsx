/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  CouponType,
  HotelType,
  UserType,
} from "../../../../backend/src/shared/types";
import { useForm } from "react-hook-form";
import {
  createPaymentIntent,
  fetchAllCoupons,
  validatePayment,
} from "../../api-client"; // Import the createPaymentIntent function
import useRazorpay from "react-razorpay";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

type Props = {
  hotel: HotelType;
  currentUser: UserType;
  hotelId: string; // Add hotelId to Props type
  amount: number; // Add amount to Props type
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  infantCount: number;
  numberOfNights: number;
  // isLoggedIn: boolean;
};

const BookingForm = ({
  hotel,
  currentUser,
  hotelId,
  amount,
  checkIn,
  checkOut,
  adultCount,
  childCount,
  infantCount,
  numberOfNights,
  // isLoggedIn,
}: Props) => {
  const [Razorpay] = useRazorpay();
  const { showToast } = useAppContext();
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [finalAmount, setFinalAmount] = useState(amount);
  const [couponValid, setCouponValid] = useState(true);
  const [enteredCoupon, setEnteredCoupon] = useState<string>("");
  const ogAmount = amount;
  const navigate = useNavigate();

  useEffect(() => {
    if (finalAmount === 0) {
      setCouponValid(false);
      showToast({
        message: "Something Went Wrong, Kindly Refresh The Page",
        type: "ERROR",
      });
    }
    const fetchCoupons = async () => {
      try {
        const data = await fetchAllCoupons();
        setCoupons(data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, [finalAmount, showToast]);

  const handleCouponChange = (e: any) => {
    const couponCode = e.target.value;
    setEnteredCoupon(couponCode);
    if (!couponCode) {
      // If coupon code is empty, enable confirm booking button
      setCouponValid(true);
      return;
    }

    const coupon = coupons.find((coupon) => coupon.couponCode === couponCode);

    if (coupon) {
      // Check if the coupon is expired
      if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
        setCouponValid(false);
        setFinalAmount(ogAmount); // Reset final amount to original amount
        showToast({ message: "Coupon Expired!!", type: "ERROR" });

        return;
      }

      // Check if the number of nights eligibility is not matched
      if (coupon.minNights && numberOfNights < coupon.minNights) {
        showToast({
          message: `You have to stay for atleast ${coupon.minNights} nights to apply this coupon`,
          type: "ERROR",
        });
        setCouponValid(false);
        setFinalAmount(ogAmount); // Reset final amount to original amount
        return;
      }

      const { couponType, amount } = coupon;
      let discount = 0;

      if (couponType === "Percentage") {
        discount = (finalAmount * amount) / 100;
      } else if (couponType === "Direct Money Off") {
        discount = amount;
      }

      let newAmount = finalAmount - discount;

      // Ensure final amount is always greater than 1
      if (newAmount <= 1) {
        newAmount = 1;
      }

      setFinalAmount(newAmount);
      setCouponValid(true);
    } else {
      // If coupon code is invalid, disable confirm booking button
      setCouponValid(false);
      setFinalAmount(ogAmount);
    }
  };

  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      phoneNumber: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Call the createPaymentIntent function to initiate payment
      const intent: any = await createPaymentIntent(hotelId, finalAmount);
      const options = {
        key: "rzp_test_SVXNvcCQpqlAcY", // Enter the Key ID generated from the Dashboard
        amount: finalAmount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Yogvan Holidays",
        description: "Booking For Stay",
        image:
          "https://res.cloudinary.com/dmwytfweq/image/upload/v1708961114/Yogvan_Final_Logo_awnzca.png",
        order_id: intent.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          await validatePayment(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature,
            finalAmount,
            currentUser._id,
            currentUser.firstName,
            currentUser.lastName,
            currentUser.email,
            checkIn,
            checkOut,
            adultCount,
            childCount,
            infantCount,
            hotel,
            data.phoneNumber
          );
          showToast({ message: "Payment Successful!", type: "SUCCESS" });

          navigate("/my-bookings");
        },
        prefill: {
          name: "Name Surname",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#a87532",
        },
      };

      const rzp1 = new Razorpay(options);

      rzp1.on(
        "payment.failed",
        function (response: { error: { description: any } }) {
          showToast({
            message: `Payment Failed! ${response.error.description}`,
            type: "ERROR",
          });
        }
      );

      rzp1.open();
    } catch (error) {
      console.error("Error creating payment intent:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // const getBookings = async () => {
  //   const data = await fetchBookings()
  //   console.log(data)
  // }
  // const getAllBookings = async () => {
  //   const data = await fetchAllBookings()
  //   console.log(data)
  // }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-1 gap-6">
        <div className="grid gap-6 grid-cols-2">
          <label className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
              type="text"
              readOnly
              disabled
              {...register("firstName")}
            />
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
              type="text"
              readOnly
              disabled
              {...register("lastName")}
            />
          </label>
        </div>
        <div className="grid gap-6 grid-cols-2 portrait:grid-cols-1">
          <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
              type="text"
              readOnly
              disabled
              {...register("email")}
            />
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Phone Number
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
              type="tel"
              {...register("phoneNumber", { required: true })} // Add register for phone number field
            />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: {finalAmount} INR
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
        <div className="flex gap-2 portrait:flex-col">
          <input
            type="text"
            placeholder="Enter coupon code"
            onChange={handleCouponChange}
            className={
              enteredCoupon === ""
                ? " border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal portrait:h-10"
                : couponValid
                ? " border rounded w-full py-2 px-3 text-black bg-green-200 font-normal portrait:h-10"
                : " border rounded w-full py-2 px-3 text-black bg-red-200 font-normal portrait:h-10"
            }
          />
          {/* <Link
            to="/#coupons"
            className="text-white bg-black rounded px-4 flex text-nowrap text-center items-center"
          >
            <span>View All Coupons</span>
          </Link> */}
          <div className="flex justify-end">
            <button
              disabled={isLoading || !couponValid || !numberOfNights}
              type="submit"
              className="text-white bg-gray-900 portrait:h-10 portrait:w-full rounded px-4 flex text-nowrap justify-center text-center items-center hover:bg-gray-800 text-md disabled:bg-gray-500"
            >
              {isLoading ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
