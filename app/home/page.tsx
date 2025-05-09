"use client";
import React, { useState, useEffect } from "react";
import { DM_Sans } from "next/font/google";
import Filter from "@/components/Filter";
import DoctorCard from "@/components/DoctorCard";
import { fetchDoctors } from "@/app/lib/api";
import { Doctor, DoctorFilterParams, PaginatedResponse } from "@/app/lib/types";
import Link from "next/link";

// Initialize DM Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

function LandingPage() {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [filters, setFilters] = useState<DoctorFilterParams>({});
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch doctors based on filters
  useEffect(() => {
    const getDoctors = async () => {
      setLoading(true);
      setError(null);
      try {
        // Add search query to filters if present
        const searchFilters = searchQuery
          ? { ...filters, search: searchQuery }
          : filters;

        const response: PaginatedResponse<Doctor> = await fetchDoctors(
          searchFilters,
          pagination.currentPage,
          10
        );

        setDoctors(response.data);
        setPagination({
          currentPage: response.meta.page,
          totalPages: response.meta.totalPages,
          totalItems: response.meta.total,
        });
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError("Failed to load doctors. Please try again.");
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    getDoctors();
  }, [filters, pagination.currentPage, searchQuery]);

  // Handle filter changes
  const handleFilterChange = (newFilters: DoctorFilterParams) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // For demo purposes, generate mock doctor data if the API call fails
  useEffect(() => {
    if (error) {
      // Generate mock doctors for testing UI
      const mockDoctors: Doctor[] = Array.from({ length: 5 }, (_, i) => ({
        id: `mock-${i}`,
        name: `Dr. ${
          [
            "John Smith",
            "Sarah Parker",
            "Raj Patel",
            "Emma Wilson",
            "Michael Lee",
          ][i % 5]
        }`,
        specialty: [
          "Cardiologist",
          "Dermatologist",
          "General Physician",
          "Pediatrician",
          "Neurologist",
        ][i % 5],
        experience: Math.floor(Math.random() * 20) + 3,
        gender: i % 2 === 0 ? "male" : "female",
        imageUrl: "",
        rating: 3.5 + Math.random() * 1.5,
        consultationFee: Math.floor(Math.random() * 2000) + 500,
        hospitalName: `Apollo Hospital ${(i % 3) + 1}`,
        languages: [
          "English",
          i % 2 === 0 ? "Hindi" : "Telugu",
          i % 3 === 0 ? "Punjabi" : "Tamil",
        ],
        isOnlineConsultAvailable: i % 3 !== 0,
        isHospitalVisitAvailable: i % 2 === 0,
      }));

      setDoctors(mockDoctors);
      setPagination({
        currentPage: 1,
        totalPages: 3,
        totalItems: 15,
      });
    }
  }, [error]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset pagination when searching
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  };

  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white"
        suppressHydrationWarning={true}
      >
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
                <Link
                  href="/"
                  className="text-2xl sm:text-3xl font-bold text-amber-500 hover:text-amber-400 transition-colors"
                  title="Apollo Healthcare Home"
                >
                  Apollo
                </Link>

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
                <form onSubmit={handleSearch} className="relative group">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                  <label htmlFor="search-doctors" className="sr-only">
                    Search doctors
                  </label>
                  <input
                    type="search"
                    id="search-doctors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full py-2 sm:py-2.5 ps-10 pe-3 text-sm text-white border border-gray-700 rounded-lg sm:rounded-xl bg-gray-800/50 focus:ring-amber-500 focus:border-amber-500 focus:outline-none placeholder:text-gray-400 transition-all"
                    placeholder="Search Doctors, Specialities, Conditions etc."
                    aria-label="Search for doctors, specialities, or conditions"
                  />
                </form>
              </div>

              {/* Location Selector and Login */}
              <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-5 mt-2 sm:mt-0">
                <button
                  className="flex items-center text-gray-300 hover:text-amber-500 transition-colors"
                  aria-label="Select location"
                >
                  <span className={`${dmSans.variable} hidden xs:inline`}>
                    Location
                  </span>
                </button>
                <Link
                  href="/addmydoctor"
                  className={`${dmSans.variable} bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white py-2 px-3 sm:py-2.5 sm:px-5 rounded-lg sm:rounded-xl transition-all shadow-md hover:shadow-cyan-500/20`}
                  aria-label="Add a new doctor"
                >
                  Add My Doctor
                </Link>
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
                <Filter
                  isMobile={true}
                  onFilterChange={handleFilterChange}
                  filters={filters}
                />
              </div>
            </div>
          </div>

          {/* Desktop Filter - Hidden on mobile */}
          <div className="hidden sm:block sm:w-72 sm:flex-shrink-0 sm:flex-grow-0">
            <Filter
              isMobile={false}
              onFilterChange={handleFilterChange}
              filters={filters}
            />
          </div>

          {/* Main content */}
          <main className="flex-1 sm:min-w-0" role="main">
            <div className="bg-black/85 backdrop-blur-md shadow-lg rounded-xl sm:rounded-2xl p-4 sm:p-7 border border-gray-800 min-h-[60vh] sm:min-h-[80vh]">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  Available Doctors
                  {pagination.totalItems > 0 && (
                    <span className="text-sm font-normal text-gray-400 ml-2">
                      ({pagination.totalItems} found)
                    </span>
                  )}
                </h2>

                {/* Filter button for mobile */}
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="sm:hidden flex items-center bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg text-sm"
                  aria-label="Show filters"
                >
                  Filters
                </button>
              </div>

              {/* Loading state */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 border-t-2 border-b-2 border-amber-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">Loading doctors...</p>
                </div>
              )}

              {/* Error state */}
              {!loading && error && (
                <div className="text-center py-16">
                  <p className="text-red-400 text-lg mb-4">{error}</p>
                  <p className="text-gray-500 max-w-md mx-auto">
                    We&apos;re showing some sample data. In production, this
                    would connect to your backend API.
                  </p>
                </div>
              )}

              {/* Doctor List */}
              {!loading && doctors.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-lg mb-4">
                    No doctors found matching your criteria
                  </p>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Try adjusting your filters or search query to find doctors.
                  </p>
                </div>
              )}

              {/* Display doctors */}
              {!loading && doctors.length > 0 && (
                <div className="space-y-6">
                  {doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-8 pt-4 border-t border-gray-800">
                      <button
                        onClick={() =>
                          handlePageChange(pagination.currentPage - 1)
                        }
                        disabled={pagination.currentPage === 1}
                        className={`flex items-center justify-center w-9 h-9 rounded-lg ${
                          pagination.currentPage === 1
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                            : "bg-gray-800 text-white hover:bg-gray-700"
                        }`}
                        aria-label="Previous page"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {/* Page numbers */}
                      {(() => {
                        // Improved pagination logic
                        let pageNumbers = [];
                        const totalPages = pagination.totalPages;
                        const currentPage = pagination.currentPage;

                        if (totalPages <= 5) {
                          // If total pages is 5 or less, show all pages
                          pageNumbers = Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          );
                        } else {
                          // Always include first and last page
                          if (currentPage <= 3) {
                            // We're near the beginning
                            pageNumbers = [1, 2, 3, 4, 5];
                          } else if (currentPage >= totalPages - 2) {
                            // We're near the end
                            pageNumbers = [
                              totalPages - 4,
                              totalPages - 3,
                              totalPages - 2,
                              totalPages - 1,
                              totalPages,
                            ];
                          } else {
                            // We're in the middle
                            pageNumbers = [
                              currentPage - 2,
                              currentPage - 1,
                              currentPage,
                              currentPage + 1,
                              currentPage + 2,
                            ];
                          }
                        }

                        return pageNumbers.map((pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`flex items-center justify-center w-9 h-9 rounded-lg ${
                              pagination.currentPage === pageNum
                                ? "bg-amber-500 text-white"
                                : "bg-gray-800 text-white hover:bg-gray-700"
                            }`}
                            aria-label={`Page ${pageNum}`}
                            aria-current={
                              pagination.currentPage === pageNum
                                ? "page"
                                : undefined
                            }
                          >
                            {pageNum}
                          </button>
                        ));
                      })()}

                      <button
                        onClick={() =>
                          handlePageChange(pagination.currentPage + 1)
                        }
                        disabled={
                          pagination.currentPage === pagination.totalPages
                        }
                        className={`flex items-center justify-center w-9 h-9 rounded-lg ${
                          pagination.currentPage === pagination.totalPages
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                            : "bg-gray-800 text-white hover:bg-gray-700"
                        }`}
                        aria-label="Next page"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              )}
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
              <Link
                href="/about"
                className="text-gray-400 hover:text-amber-500 text-sm"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-amber-500 text-sm"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-amber-500 text-sm"
              >
                Privacy Policy
              </Link>
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
