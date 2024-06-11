import { FaEnvelope, FaFacebook, FaInstagram, FaPhone, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-yogvan pt-2 portrait:text-xs flex flex-col items-center poppins-regular">
      <div className="text-4xl text-white font-semibold tracking-tight text-center mb-6">
        <Link to="/"><img src="mbsv.png" alt="" /></Link>
      </div>
      <div className="container mx-auto flex portrait:flex-col  landscape:items-center landscape:flex-row  justify-between">
        {/* Contact information */}
        <div className="text-white font-semibold tracking-tight landscape:mt-2  text-left">
          <div className="flex flex-col   items-start">
            <div className="flex flex-col gap-2 landscape:mt-2">
              <span className="flex gap-2 items-center">
                
              <FaPhone />
              <p className="text-sm  text-base"> +91 7439512116 </p>
              </span>
              <span className="flex gap-2 items-center">

              <FaEnvelope />
              <p className="text-sm  text-base">
              office.mbsv@ashokhall.org 
              </p>
              </span>
            </div>
            <div className="flex gap-2 landscape:mb-2">
              {/* 
              <p className="text-sm  text-base">
                mail: yogvanholidays@gmail.com
              </p> */}
            </div>
          </div>
        </div>
        {/* Additional info */}
        <div className="text-white font-semibold tracking-tight mt-2  landscape:text-right  portrait:text-left ">
          <div className="flex flex-col   landscape:items-end justify-center">
              <span className="flex text-center text-2xl items-center gap-3 landscape:mb-2">
                <span>Our Socials </span>
                <span className="flex gap-2">
                  <a
                    href="https://www.youtube.com/channel/UCR7jnc9HyBnLq2Wk0DF2hkA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube />
                  </a>
                  <a
                    href="https://www.instagram.com/mbsv_socials/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=100072262147411"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook />
                  </a>
                </span>
              </span>
            
          </div>
        </div>
      </div>
      {/* Bottom */}
      {/* <div className="bg-black w-full text-white text-center py-2 mt-3">
        <p className="text-xs  text-sm">
          © Yogvanholidays 2021. All Rights Reserved. Designed by BatLoop
        </p>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 px-2">
      {/* Junior & Middle Section */}
      <div className="rounded-lg overflow-hidden">
        <div className="bg-gray-100 p-4">
          <h2 className="text-xl font-bold mb-2">JUNIOR &amp; MIDDLE Section (Nursery to Classes 8)</h2>
        </div>
        <div className="">
          <iframe
            className="w-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.5604331615364!2d88.3659953144331!3d22.520669640551485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276d38d4766a1%3A0x30d0695402b704cd!2s219%2C%20Rash%20Behari%20Ave%2C%20Dhakuria%2C%20New%20Market%20Area%2C%20Fern%20Place%2C%20Gariahat%2C%20Kolkata%2C%20West%20Bengal%20700019!5e0!3m2!1sen!2sin!4v1636457992432!5m2!1sen!2sin"
            height="210"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Senior Section */}
      <div className="rounded-lg overflow-hidden">
        <div className="bg-gray-100 p-4">
          <h2 className="text-xl font-bold mb-2">Senior Section (Classes 9 to 12)</h2>
        </div>
        <div className="">
          <iframe
            className="w-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.276791298849!2d88.36395291495883!3d22.531301885204076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027726b8d82ef9%3A0x6cfdf838740a1262!2sMahadevi%20Birla%20Shishu%20Vihar!5e0!3m2!1sen!2sin!4v1636458060485!5m2!1sen!2sin"
            height="210"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Footer;
