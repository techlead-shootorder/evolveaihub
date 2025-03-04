"use client";
import React, { useState } from "react";
import {
  Brain,
  Zap,
  BarChart3,
  Clock,
  Shield,
  MessageSquare,
  ArrowRight,
  Check,
  TrendingUp,
  Users,
  Bell,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import KeyBenefits from "@/components/home/KeyBenefits";
import About from "@/components/home/About";
import Overview from "@/components/home/Overview";
import Footer from "@/components/home/Footer";

// const Header = () => (
//   <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
//     <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//       <div className="flex items-center">
//         <Brain className="h-8 w-8 text-blue-600" />
//         <span className="ml-2 text-xl font-bold">AI Assist Pro</span>
//       </div>
//       <div className="hidden md:flex items-center space-x-8">
//         <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
//         <a href="#how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</a>
//         <a href="#benefits" className="text-gray-600 hover:text-blue-600">Benefits</a>
//         <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
//       </div>
//       <div className="flex items-center space-x-4">
//         <button className="px-4 py-2 text-blue-600 hover:text-blue-700">Login</button>
//         <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//           Get Started
//         </button>
//       </div>
//     </nav>
//   </header>
// );

const HeroBanner = () => (
  <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Business with Advanced AI Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Harness the power of artificial intelligence to streamline
            operations, boost productivity, and drive growth.
          </p>
          <div className="flex space-x-4">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
              Watch Demo
            </button>
          </div>
          <div className="mt-8 flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src={`/api/placeholder/40/40`}
                  alt="User avatar"
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              <div className="font-semibold">500+ businesses</div>
              <div>trust our AI solutions</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <img
              src="/api/placeholder/600/400"
              alt="AI Platform Dashboard"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// const HowItWorks = () => (
//   <section id="how-it-works" className="py-20 bg-white">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="text-center mb-16">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
//         <p className="text-xl text-gray-600">Simple steps to implement AI in your workflow</p>
//       </div>
//       <div className="grid md:grid-cols-3 gap-8">
//         {[
//           {
//             icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
//             title: "Connect Your Data",
//             description: "Seamlessly integrate your existing data sources and systems"
//           },
//           {
//             icon: <Zap className="h-8 w-8 text-blue-600" />,
//             title: "AI Processing",
//             description: "Our advanced AI analyzes and processes your data in real-time"
//           },
//           {
//             icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
//             title: "Get Insights",
//             description: "Receive actionable insights and automate your workflows"
//           }
//         ].map((step, index) => (
//           <div key={index} className="text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
//             <div className="inline-block p-3 bg-blue-50 rounded-lg mb-4">
//               {step.icon}
//             </div>
//             <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
//             <p className="text-gray-600">{step.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

const Benefits = () => (
  <section id="benefits" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Benefits</h2>
        <p className="text-xl text-gray-600">
          Why businesses choose our AI solution
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: <Clock className="h-6 w-6 text-blue-600" />,
            title: "Save Time",
            description:
              "Automate repetitive tasks and focus on strategic decisions",
          },
          {
            icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
            title: "Increase Efficiency",
            description: "Optimize operations with AI-driven insights",
          },
          {
            icon: <Shield className="h-6 w-6 text-blue-600" />,
            title: "Enhanced Security",
            description: "Enterprise-grade security for your sensitive data",
          },
          {
            icon: <Users className="h-6 w-6 text-blue-600" />,
            title: "Team Collaboration",
            description: "Seamless integration with your existing workflow",
          },
          {
            icon: <Bell className="h-6 w-6 text-blue-600" />,
            title: "Real-time Alerts",
            description: "Stay informed with intelligent notifications",
          },
          {
            icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
            title: "Advanced Analytics",
            description: "Deep insights into your business performance",
          },
        ].map((benefit, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-50 rounded-lg mr-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold">{benefit.title}</h3>
            </div>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Dashboard = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Powerful Dashboard
        </h2>
        <p className="text-xl text-gray-600">
          Monitor and manage your AI solutions in one place
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Active Users</h3>
            <div className="text-3xl font-bold text-blue-600">2,543</div>
            <div className="mt-2 text-sm text-blue-600">
              ↑ 12% from last month
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Tasks Automated</h3>
            <div className="text-3xl font-bold text-green-600">15,234</div>
            <div className="mt-2 text-sm text-green-600">
              ↑ 23% from last month
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Time Saved</h3>
            <div className="text-3xl font-bold text-purple-600">1,432 hrs</div>
            <div className="mt-2 text-sm text-purple-600">
              ↑ 18% from last month
            </div>
          </div>
        </div>
        <img
          src="/api/placeholder/1200/600"
          alt="Dashboard Preview"
          className="w-full"
        />
      </div>
    </div>
  </section>
);

const CallToAction = () => (
  <section className="py-20 bg-blue-600">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold text-white mb-8">
        Ready to Transform Your Business with AI?
      </h2>
      <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
        Start Your Free Trial
      </button>
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="min-h-screen">
       <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <KeyBenefits />
        <About />
        <Overview/>
        {/* <Dashboard />
        <CallToAction /> */}
      </main>
      <Footer/>
    </div>
  );
};

export default Home;
