"use client";
import React, { useState } from "react";
import { DM_Sans } from "next/font/google";
import Filter from "@/components/Filter";
import Head from "next/head";
import { Metadata } from "next";

// Initialize DM Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

function LandingPage() {
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Header Section */}
        <div className="w-full pt-4 sm:pt-6 flex justify-center">
          <header
            className="w-[97%] sm:w-[96%] bg-black/85 backdrop-blur-md shadow-lg rounded-xl sm:rounded-2xl py-3 sm:py-5 px-3 sm:px-7 border border-gray-800"
            role="banner"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
              {/* Logo */}
              <div
                className={`${dmSans.variable} flex items-center justify-between`}
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-amber-500 hover:text-amber-400 transition-colors">
                  <a href="/" title="Apollo Healthcare Home">
                    Apollo
                  </a>
                </h1>

                {/* Mobile menu toggle */}
                <button
                  onClick={() => setShowMobileFilter(!showMobileFilter)}
                  className="sm:hidden bg-gray-800 hover:bg-gray-700 p-2 rounded-lg"
                  aria-label="Toggle filters"
                  aria-expanded={showMobileFilter}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Search Bar */}
              <div className="w-full sm:w-2/5">
                <div className="relative group">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <label htmlFor="search-doctors" className="sr-only">
                    Search doctors
                  </label>
                  <input
                    type="search"
                    id="search-doctors"
                    className="block w-full py-2 sm:py-2.5 ps-10 pe-3 text-sm text-white border border-gray-700 rounded-lg sm:rounded-xl bg-gray-800/50 focus:ring-amber-500 focus:border-amber-500 focus:outline-none placeholder:text-gray-400 transition-all"
                    placeholder="Search Doctors, Specialities, Conditions etc."
                    aria-label="Search for doctors, specialities, or conditions"
                  />
                </div>
              </div>

              {/* Location Selector and Login */}
              <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-5 mt-2 sm:mt-0">
                <button
                  className="flex items-center text-gray-300 hover:text-amber-500 transition-colors"
                  aria-label="Select location"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className={`${dmSans.variable} hidden xs:inline`}>
                    Location
                  </span>
                </button>
                <button
                  className={`${dmSans.variable} bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white py-2 px-3 sm:py-2.5 sm:px-5 rounded-lg sm:rounded-xl transition-all shadow-md hover:shadow-amber-500/20`}
                  aria-label="Login to your account"
                >
                  Login
                </button>
              </div>
            </div>
          </header>
        </div>

        <div className="container mx-auto px-3 sm:px-7 mt-5 sm:mt-8 flex flex-col sm:flex-row">
          {/* Mobile filter overlay */}
          <div
            className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 sm:hidden transition-opacity duration-300 ${
              showMobileFilter ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setShowMobileFilter(false)}
            aria-hidden={!showMobileFilter}
            role="dialog"
            aria-modal="true"
            aria-label="Filter options"
          >
            <div
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2
                    className={`${dmSans.variable} text-xl font-semibold text-white`}
                  >
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowMobileFilter(false)}
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
                    aria-label="Close filters"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <Filter isMobile={true} />
              </div>
            </div>
          </div>

          {/* Desktop Filter - Hidden on mobile */}
          <div className="hidden sm:block">
            <Filter isMobile={false} />
          </div>

          {/* Main content */}
          <main className="flex-1" role="main">
            <div className="bg-black/85 backdrop-blur-md shadow-lg rounded-xl sm:rounded-2xl p-4 sm:p-7 border border-gray-800 min-h-[60vh] sm:min-h-[80vh]">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  Available Doctors
                </h2>

                {/* Filter button for mobile */}
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="sm:hidden flex items-center bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg text-sm"
                  aria-label="Show filters"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h10a1 1 0 010 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h4a1 1 0 010 2H4a1 1 0 01-1-1z"
                    />
                  </svg>
                  Filters
                </button>

                <div className="hidden sm:flex space-x-3">
                  <button
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm"
                    aria-label="Sort by popularity"
                  >
                    Popular
                  </button>
                  <button
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm"
                    aria-label="Sort by most recent"
                  >
                    Latest
                  </button>
                </div>
              </div>

              {/* Empty state with structured data for SEO */}
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg mb-4">
                  Find the best doctors matching your criteria
                </p>
                <p className="text-gray-500 max-w-md mx-auto">
                  Use filters to find doctors by specialization, fees, or
                  preferred language. Book appointments online or visit in
                  person.
                </p>
              </div>
            </div>
          </main>
        </div>

        {/* Footer with schema.org data for better SEO */}
        <footer className="container mx-auto px-4 py-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 sm:mb-0">
              © {new Date().getFullYear()} Apollo Healthcare. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="/about"
                className="text-gray-400 hover:text-amber-500 text-sm"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-gray-400 hover:text-amber-500 text-sm"
              >
                Contact
              </a>
              <a
                href="/privacy"
                className="text-gray-400 hover:text-amber-500 text-sm"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Hidden section for Schema.org structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Apollo Healthcare",
                url: "https://apollohealthcare.com",
                logo: "https://apollohealthcare.com/logo.png",
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+91-1234567890",
                  contactType: "customer service",
                },
                sameAs: [
                  "https://www.facebook.com/ApolloHealthcare",
                  "https://twitter.com/ApolloHealthcare",
                  "https://www.instagram.com/apollohealthcare",
                ],
              }),
            }}
          />
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
