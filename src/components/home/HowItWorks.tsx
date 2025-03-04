"use client";

import Image from "next/image";
import { FaLayerGroup, FaEdit, FaStar } from "react-icons/fa";

const sections = [
  {
    images: [
      "/images/image5.jpg",
      "/images/image6.jpg",
      "/images/image7.jpg",
      "/images/image8.jpg",
    ],
    features: [
      {
        icon: <FaLayerGroup className="inline-block text-primary text-xl" />,
        title: "Connect Domain & White-Labeling",
        description:
          "Easily connect ChatLX to your own domain and fully brand it to match your site—no technical hassle.",
      },
      {
        icon: <FaEdit className="text-primary text-xl" />,
        title: "5-Minute Setup",
        description:
          "Set up your ChatLX AI assistant in just 5 minutes with zero coding required.",
      },
      {
        icon: <FaStar className="text-primary text-xl" />,
        title: "Onboard Team Members",
        description:
          "Easily onboard your team members to ChatLX, so they can collaborate in managing chats and optimizing performance.",
      },
    ],
  },
  {
    images: [
      "/images/image5.jpg",
      "/images/image6.jpg",
      "/images/image7.jpg",
      "/images/image8.jpg",
    ],
    features: [
      {
        icon: <FaLayerGroup className="text-primary text-xl" />,
        title: "Integrated LMS",
        description:
          "Continuously train and improve your AI chat agent using the built-in LMS to keep it up to date on your products and services.",
      },
      {
        icon: <FaEdit className="text-primary text-xl" />,
        title: "CRM Integrations",
        description:
          "Seamlessly integrate ChatLX with your CRM and other tools to automatically log conversations, update lead records, and streamline your sales workflow.",
      },
      {
        icon: <FaStar className="text-primary text-xl" />,
        title: "AI Lead Booster",
        description:
          "Leverage an AI-powered lead booster that actively engages every visitor, ensuring you never miss a potential customer.",
      },
    ],
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-16 bg-[#F2F3FB] overflow-hidden">
      {/* Curved / Wave Background */}
      <div className="absolute inset-0 top-0 -z-10">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,96L48,122.7C96,149,192,203,288,208C384,213,480,171,576,149.3C672,128,768,128,864,160C960,192,1056,256,1152,245.3C1248,235,1344,149,1392,106.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-6xl text-center">
        {/* Heading */}
        <h2 className=" text-xl md:text-[3rem] mx-auto font-thicccboi leading-tight text-headingText font-bold">
          Save time and increase conversions by choosing{" "}
          <span className="text-primary">ChatLX</span> for your business.
        </h2>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-indigo-500">
          {[
            { count: "5", label: "Minute Setup" },
            { count: "100%", label: "White-Labeled" },
            { count: "24/7", label: "Lead Generation" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-5xl font-bold text-primary">{stat.count}</p>
              <p className="mt-3 text-lg text-paraText">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Sections */}
        {sections.map((section, index) => (
          <div
            key={index}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 items-center gap-16"
          >
            {/* Image grid */}
            <div
              className={`grid grid-cols-2 gap-4 ${
                index % 2 !== 0 ? "md:order-2" : ""
              }`}
            >
              {section.images.map((imgSrc, imgIndex) => (
                <div
                  key={imgIndex}
                  className={`bg-white p-2 rounded-lg shadow-md transition-transform hover:scale-105 ${
                    imgIndex % 2 === 0 ? "-translate-y-2" : "translate-y-2"
                  }`}
                >
                  <Image
                    src={imgSrc}
                    alt={`Feature Image ${imgIndex + 1}`}
                    width={400}
                    height={300}
                    className="rounded-md w-full h-auto"
                  />
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-6">
              {section.features.map((feature, featIndex) => (
                <div key={featIndex} className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-200 rounded-full">
                    {feature.icon}
                  </div>
                  <div className="text-left md:max-w-sm">
                    <h3 className="text-xl font-bold text-headingText">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[18px] text-paraText">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
