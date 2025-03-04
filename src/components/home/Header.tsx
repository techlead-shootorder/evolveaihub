"use client";

import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check Authentication
    useEffect(() => {
      const checkAuth = async () => {
        if (status === "loading") return;
        const userData = JSON.parse(localStorage.getItem("userData") ?? "{}") as UserData;
  
        // if not a logged in user
        if (!userData?.id && !session) {
          setIsLoggedIn(false);
        

        } else{
          setIsLoggedIn(true);
        }

      };
      checkAuth();
    }, [session, status, router]);


  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 relative">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 flex items-center"
        >
          <Image src='/images/logo/chatlx_logo.webp' className="object-cover h-[60px] w-[150px]" alt="logo" width={150} height={80}/>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 ">
        </nav>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-4">
          {/* <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
            <i className="fas fa-info-circle text-gray-700"></i>
          </button> */}

         {isLoggedIn ?(
          <button
          className="bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </button>

         ) : (<button
            className="bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition"
            onClick={() => router.push("/login")}
          >
            Sign In
          </button>)}
        </div>
      </div>
    </header>
  );
}

export default Header;