import Image from "next/image";

export default function About() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 items-center justify-center min-h-screen p-10 bg-white container gap-6">
      {/* Left Side: Single Image */}
      <div className="flex justify-center">
        <Image
          src="/images/mobile.webp"
          alt="Mockup"
          width={300}
          height={400}
          className="rounded-xl"
        />
      </div>

      {/* Right Side: Text Content */}
      <div className="text-center md:text-left">
        <p className="text-[15px] mb-3 text-paraText uppercase font-inter font-bold">Always Available</p>
        <h2 className=" text-[25px] md:text-[3rem] mx-auto font-thicccboi leading-tight text-headingText font-bold">
          Available to chat with customers 24/7, so you never miss an inquiry.
        </h2>
        <p className="mt-3 text-[19px] text-paraText font-inter">
          ChatLX works flawlessly on any device—smartphone, tablet, or desktop—ensuring every visitor has a seamless experience.
        </p>
        {/* QR Code */}
        <div className="mt-6 flex justify-start md:justify-start">
          <Image
            src="/images/qrcode.jpg"
            alt="QR Code"
            width={64}
            height={64}
            className="w-16 h-16"
          />
        </div>
      </div>
    </section>
  );
}
