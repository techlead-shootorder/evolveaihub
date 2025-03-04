'use client';

import Image from 'next/image';


interface CompanyProps {
    logo: string;
    name: string;
  }
export default function KeyBenefits() {
  return (
    <section className="py-16 bg-gray-50 flex flex-col items-center">
      {/* Main Content Box */}
      <div className="relative w-full max-w-5xl bg-white shadow-xl rounded-lg p-6 md:p-8">
        
        {/* Main Image Section with Content */}
        <div className="relative">
          <Image
            src="/images/de1.jpg"
            alt="Feature Showcase"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto"
          />
          
          {/* Content Over Image */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white p-4">
            <h2 className="text-lg md:text-xl font-bold"></h2>
            <p className="text-xs md:text-sm text-gray-200 mt-2"></p>
          </div>

          {/* Corporate Plan Card */}
          <div className="absolute top-1/2 right-0 md:right-[-100px] transform -translate-y-1/2 bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-headingText font-thicccboi leading-tight ">	Starting at $49/month</h3>
            <p className="mt-3 text-[16px] text-paraText max-w-lg font-inter">Business Plan</p>
          </div>
        </div>        

        {/* Floating Elements (Features) */}
        <div className="absolute top-[10rem] left-[-80px] md:left-[-100px] hidden md:block bg-white p-4 rounded-lg shadow-md">
          <p className="text-xl font-bold text-headingText font-thicccboi leading-tight ">Unlimited AI Conversations</p>
          <p className="mt-3 text-[15px] text-paraText max-w-lg font-inter">Chat with as many visitors as you want<br/> no limits on interactions or leads captured.</p>
        </div>

        <div className="absolute bottom-[10rem] left-[-80px] md:left-[-100px] hidden md:block bg-white p-4 rounded-lg shadow-md">
          <p className="text-xl font-bold text-headingText font-thicccboi leading-tight ">Integrated Lead Management</p>
          <p className="mt-3 text-[16px] text-paraText max-w-lg font-inter">Automatically capture lead details and<br/> qualify them in chat, streamlining your<br/> follow-up and sales process.</p>
        </div>
      </div>

      {/* Icons Gallery */}
      <div className="mt-12 w-full max-w-7xl px-4">
        <h2 className="text-lg md:text-xl font-bold text-center mb-4"></h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {companyData.map((company, index) => (
            <CompanyCard key={index} logo={company.logo} name={company.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanyCard({ logo, name }: CompanyProps) {
  return (
    <div className="flex flex-col items-center p-4  rounded-lg">
      <Image src={logo} alt={name} width={80} height={80} className="rounded-full w-16 h-16 md:w-20 md:h-20" />
      <h4 className="text-xl mt-4 font-bold text-headingText font-thicccboi leading-tight ">{name}</h4>
    </div>
  );
}

// Example company data
const companyData = [
  { logo: "/images/fi1@2x.png", name: "Company One" },
  { logo: "/images/fi2@2x.png", name: "Company Two" },
  { logo: "/images/fi3@2x.png", name: "Company Three" },
  { logo: "/images/fi4@2x.png", name: "Company Four" },
  { logo: "/images/fi5@2x.png", name: "Company Five" },
  { logo: "/images/fi6@2x.png", name: "Company Six" },
  { logo: "/images/fi7@2x.png", name: "Company Seven" },
  { logo: "/images/fi8@2x.png", name: "Company Eight" },
  { logo: "/images/fi9@2x.png", name: "Company Nine" },
  { logo: "/images/fi10@2x.png", name: "Company Ten" },
];
