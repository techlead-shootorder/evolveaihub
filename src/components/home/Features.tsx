"use client";

import Image from "next/image";
import { FaCheck } from "react-icons/fa";

const demoData = [
  {
    id: 1,
    title: "Talk",
    features: [
      // "Network, Marketing",
      // "3D illustrations",
      // "SVG icons",
      // "Gradient image",
      "Engage website visitors with personalized, industry-specific conversations that feel human and keep them captivated.",
    ],
    image1: "/images/image1.jpg",
    image2: "/images/image2.jpg",
  },
  {
    id: 2,
    title: "Sell",
    features: [
      // "E-commerce",
      // "Custom animations",
      // "Responsive design",
      // "Dark mode",
      "Turn engaged chats into conversions by guiding visitors to take the next step—book a meeting, request a quote, or make a purchase—right inside the chat.",
    ],
    image1: "/images/image1.jpg",
    image2: "/images/image2.jpg",
  },
  // {
  //   id: 3,
  //   title: "Demo Layout XX",
  //   features: [
  //     "Minimalist UI",
  //     "Lightweight components",
  //     "High performance",
  //     "SEO optimized",
  //   ],
  //   image1: "/images/image1.jpg",
  //   image2: "/images/image2.jpg",
  // },
];

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* <h2 className="text-[3rem] md:text-[4rem] font-extrabold text-primary text-center">
          21
        </h2> */}
        <p className=" text-[25px]  md:text-[3rem] mb-4 mx-auto font-thicccboi leading-tight text-headingText font-bold text-center w-full md:max-w-5xl">
          Engaging, Intelligent, and Conversion-Focused AI Conversations from
          Day One.
        </p>

        <div className="mt-10 space-y-12">
          <p className="text-sm text-paraText font-thicccboi uppercase  text-center">
            KEY FEATURES
          </p>
          {demoData.map((demo) => (
            <div
              key={demo.id}
              className="bg-[#F0F0F8] rounded-xl overflow-hidden flex flex-col lg:flex-row items-center gap-12 p-6 lg:p-10"
            >
              <div className="flex flex-wrap justify-center gap-6">
                {[demo.image1, demo.image2].map((image, index) => (
                  <div
                    key={index}
                    className={`
        relative w-[280px] h-[380px] sm:w-[320px] sm:h-[420px] 
        overflow-hidden rounded-lg group
        ${index === 0 ? "mb-[-40px]" : "-mt-10"} 
      `}
                  >
                    <Image
                      src={image}
                      alt={`Demo Layout ${demo.id} - ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg shadow-md transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-lg font-semibold">
                        See the Full Demo
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-[28px] mx-auto font-thicccboi leading-tight text-headingText font-bold text-left ">
                  {demo.title}
                </h3>
                <ul className="mt-4 text-paraText">
                  {demo.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-paraText font-medium text-[20px]"
                    >
                      <FaCheck className="text-primary mr-2 font-light text-[30px] lg:mr-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {/* <button className="mt-6 bg-primary text-white py-3 px-6 rounded-full text-sm font-semibold hover:bg-indigo-700 transition">
                  See More
                </button> */}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="bg-primary text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-indigo-700 transition">
            See All Features
          </button>
        </div>
      </div>
    </section>
  );
}
