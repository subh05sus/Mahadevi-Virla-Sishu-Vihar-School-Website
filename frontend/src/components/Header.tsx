/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
// import SignOutButton from "./SignOutButton";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { fetchCarouselImages } from "../api-client";
import { CarouselImageType } from "../../../backend/src/shared/types";
// import yogbanLogo from "../assets/Yogvan.png";

interface Props {
  bgHandle: string;
}

const Header = ({ bgHandle }: Props) => {
  const isHomePage = bgHandle === "HomePage";
  const [images, setImages] = useState<CarouselImageType[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const carouselImages = await fetchCarouselImages();
        setImages(carouselImages);
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className={isHomePage ? "pb-3" : "pb-5"}>
      <div
        className={`${
          isHomePage ? `${isScrolled?'bg-slate-500':'  bg-gradient-to-b from-slate-600 to-transparent'}` : 'bg-slate-500'
        } px-3 lg:px-5 max-w-full flex justify-between select-none py-2 z-30 transition-all duration-200`}
        style={{
          position: "fixed",
          top: 0,
          zIndex: 999,
          width: "100%",
          transition: "padding 0.3s",
        }}
      >
        <span className="text-3xl text-black font-bold tracking-tight">
          <Link to="/">
            <span className="flex text-center flex-col items-center gap-3 portrait:w-full">
              <img
                src="/mbsv.png"
                className="h-14 my-1"
                alt=""
              />
            </span>
          </Link>
        </span>
        {/* <span
          className="flex cursor-pointer select-none items-center"
          onClick={handlePopupToggle}
        >
          <span className="flex flex-col items-center mx-1">
              <span className="text-xl portrait:text-sm  italic landscape:px-4 landscape:py-2 portrait:px-2 portrait:py-1 rounded-full border ">Guest's Experiences...</span>
          </span>
          
        </span> */}


      </div>
      {isHomePage ? (
        <Carousel className="w-auto h-[45rem] portrait:h-[25rem]">
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <div
                className="d-block w-screen object-cover relative h-[45rem] portrait:h-[25rem]"
                style={{
                  backgroundImage: `url(${image.imageUrl || "https://via.placeholder.com/800x400"
                    })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-center items-center ">
                  {image.featuredText && <h3
                    className="text-white text-6xl pt-serif-bold portrait:text-2xl animate-rise-up"
                    style={{ textShadow: "0px 0px 30px rgba(0, 0, 0, 0.9)" }}
                  >
                    {image.featuredText}
                  </h3>}
                  {image.ButtonLink && <Link
                    to={image.ButtonLink}
                    className="border-2 text-white px-6 py-3 portrait:px-4 portrait:py-2 portrait:mt-1 landscape:mt-4 rounded-md text-xl exploreButtonCarousel duration-200 animate-rise-up-2"
                  >
                    Explore
                  </Link>}
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <></>
        // <div className="container mx-auto flex flex-col gap-2">
        //   <h1 className="text-5xl text-black font-bold">Find Your Next Stay</h1>
        //   <p className="text-2xl text-black">
        //     Search low prices on hotels for your dream vacations
        //   </p>
        // </div>
      )}
    </div>
  );
};

export default Header;
