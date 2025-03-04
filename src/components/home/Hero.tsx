"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const textArray = [
  "your business.",
  "your portfolio.",
  "your startup.",
  "digital marketing.",
];

export default function Hero() {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = textArray[index];
      if (!isDeleting) {
        setCurrentText((prev) => currentWord.slice(0, prev.length + 1));
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1500); // Pause before deleting
        }
      } else {
        setCurrentText((prev) => currentWord.slice(0, prev.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % textArray.length);
        }
      }
    };
    const timeout = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, index]);

  return (
    <section className="bg-[#F2F3FB] min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Side: Text Content */}
        <div>
          <h1 className="text-3xl md:text-[52px] leading-tight text-headingText font-bold">
            ChatLX – Talk, <br /> Qualify & Sell with AI <br />
            {/* <span className="text-primary">{currentText}</span>
            <span className="animate-blink">|</span> */}
          </h1>
          <p className="mt-4  text-[18px] md:text-[24px] text-paraText max-w-lg font-inter">
            ChatLX is an interactive AI chat agent designed for businesses.
            Deploy it on your site in minutes and watch it engage visitors,
            qualify leads, and drive sales automatically.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-primary  text-[18px] md:text-[20px] font-medium text-white px-8 py-4 rounded-full hover:bg-blue-700 transition">
              Get Started with ChatLX
            </button>
            {/* <button className="bg-gray-200 text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-300 transition">
              Free Trial
            </button> */}
          </div>
        </div>

        {/* Right Side: Image Section */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column */}
          <div className="col-span-3 flex flex-col items-end">
            <Image
              src="/images/hero-banner-1.jpg"
              alt="Image 1"
              width={200}
              height={200}
              className="rounded-xl shadow-lg"
            />
            <Image
              src="/images/hero-banner-2.jpg"
              alt="Image 2"
              width={200}
              height={200}
              className="rounded-xl shadow-lg mt-5"
            />
          </div>

          {/* Center Column */}
          <div className="col-span-6">
            <Image
              src="/images/hero-banner-3.jpg"
              alt="Main Image"
              width={500}
              height={500}
              className="w-full rounded-xl shadow-xl"
            />
          </div>

          {/* Right Column */}
          <div className="col-span-3 flex flex-col items-start">
            <Image
              src="/images/hero-banner-4.jpg"
              alt="Image 3"
              width={200}
              height={200}
              className="rounded-xl shadow-lg"
            />
            <Image
              src="/images/hero-banner-5.jpg"
              alt="Image 4"
              width={200}
              height={200}
              className="rounded-xl shadow-lg mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
