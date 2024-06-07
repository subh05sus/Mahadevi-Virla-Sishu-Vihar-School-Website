import Lottie from 'lottie-react';
import animationData from '../assets/anim1.json';

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 mb-4">
      <div className="lg:col-span-2">
        <p className="flex flex-col font-semibold">
          <span className="text-2xl">WELCOME TO</span>
          <span className="text-4xl text-yogvan font-bold">MAHADEVI BIRLA SHISHU VIHAR</span>
        </p>
        <p className="my-2 grid grid-cols-1 gap-2 text-lg">
          <p>The School: Inaugurated as the first educational institution under Ashok hall Group of Schools, Mahadevi Birla Shishu Vihar was established in the year 1946.</p>
          <p>Initially founded as a playschool by Late Sarala Birla for her son, Shri Aditya Vikram Birla, our prestigious institution completes its 75th year as one of the most trusted schools in Kolkata . Since the time of its inception, our founder Late Sarala Birla’s astute faith in child-centric education has helped the school evolve into an institute par excellence.</p>
          <p>We became the first school in Kolkata to be certified by the International Organisation for Standardisation, sharing compliance with ISO 9001:2015 and ISO 14001:2015.</p>
          <p>Our rapidly growing Alumni association holds a record of trailblazing achievements of our students, both academically and professionally.
            The school is affiliated with the Council for Indian Certificate of Secondary Education (ICSE Board), New Delhi.</p>
        </p>
      </div>
      <div>
      <Lottie animationData={animationData} />

      </div>
    </div>
  );
};

export default Hero;
