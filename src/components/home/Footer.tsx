"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href={"/"}>
            <Image
              src="/images/Brand-mark.png"
              alt="Logo"
              width={20}
              height={20}
              priority
            />
          </Link>
        </div>
        {/* Links Section */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:underline">
            Terms and Conditions
          </Link>
        </div>

        {/* Copyright Section */}
        <div className="mt-4 md:mt-0 text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
