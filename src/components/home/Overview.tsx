"use client";

import Image from "next/image";

export default function Overview() {
  return (
    <section className="relative py-16 text-center flex flex-col items-center overflow-hidden bg-white">
      {/* Curved / Wavy Background */}
      <div className="absolute inset-0 top-0 -z-10">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            fill="#f8fafc"
            fillOpacity="1"
            d="M0,32L48,42.7C96,53,192,75,288,101.3C384,128,480,160,576,186.7C672,213,768,235,864,218.7C960,203,1056,149,1152,112C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      {/* Logo (Optional) */}
      <div className="mb-4">
        <Image src="/images/Brand-mark.png" alt="Logo" width={40} height={40} />
      </div>

      {/* Title & Description */}
      <h1 className="text-[25px] md:text-[3rem] mb-4 mx-auto font-thicccboi leading-tight text-headingText font-bold max-w-4xl m-auto">
        Stand out and engage smarter.
        <br /> Make a difference with ChatLX.{" "}
      </h1>
      <p className="mt-4 mb-4 text-[18px] text-paraText font-inter max-w-[650px] m-auto">
        Everything you need to revolutionize customer engagement—ready-to-use
        conversation flows, smart lead qualification, and seamless integrations,
        all in one platform.
      </p>

      {/* Button */}
      <a
        href="#"
        className="mt-6 bg-primary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-500 hover:text-white transition"
      >
        Get ChatLX
      </a>

      {/* Overlapping Images */}
      <div className="relative mt-12 w-full max-w-4xl flex justify-center">
        {/* Left Image */}
        <div className="absolute left-[0%] top-10 hidden md:block">
          <Image
            src="/images/image1.jpg"
            alt="Left"
            width={280}
            height={180}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Center Image */}
        <div className="relative z-10">
          <Image
            src="/images/image2.jpg"
            alt="Center"
            width={400}
            height={250}
            className="rounded-lg shadow-2xl"
          />
        </div>

        {/* Right Image */}
        <div className="absolute right-[0%] top-10 hidden md:block">
          <Image
            src="/images/image1.jpg"
            alt="Right"
            width={280}
            height={180}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
