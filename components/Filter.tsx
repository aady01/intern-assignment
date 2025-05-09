"use client";
import React, { useState, useCallback } from "react";
import { DM_Sans } from "next/font/google";
import { DoctorFilterParams } from "@/app/lib/types";

// Initialize DM Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

interface FilterProps {
  isMobile?: boolean;
  onFilterChange: (filters: DoctorFilterParams) => void;
  filters: DoctorFilterParams;
}

const Filter = ({ isMobile = false, onFilterChange, filters }: FilterProps) => {
  // State for accordion sections
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({
    specialty: true, // Start expanded for better UX
    gender: true,
    experience: true,
    rating: true,
  });

  // Common specialties
  const specialties = [
    "General Physician",
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Gynecologist",
    "Orthopedist",
    "Neurologist",
    "Psychiatrist",
    "Dentist",
    "Ophthalmologist",
  ];

  // Rating options
  const ratingOptions = [
    { value: "4.5", label: "4.5 & above" },
    { value: "4", label: "4 & above" },
    { value: "3.5", label: "3.5 & above" },
    { value: "3", label: "3 & above" },
  ];

  // Toggle section visibility (for mobile accordion)
  const toggleSection = (section: string) => {
    if (isMobile) {
      setCollapsedSections({
        ...collapsedSections,
        [section]: !collapsedSections[section],
      });
    }
  };

  // Handle filter changes
  const handleFilterChange = useCallback(
    (filterType: string, value: string | boolean) => {
      const newFilters = { ...filters };

      // Handle filter types
      if (filterType === "experience") {
        newFilters.experience = value as string;
      } else if (filterType === "gender") {
        newFilters.gender = value as string;
      } else if (filterType === "specialty") {
        newFilters.specialty = value as string;
      } else if (filterType === "rating") {
        newFilters.rating = value as string;
      }

      onFilterChange(newFilters);
    },
    [filters, onFilterChange]
  );

  // Clear all filters
  const handleClearFilters = () => {
    onFilterChange({});
  };

  return (
    <aside
      className={`${dmSans.variable} ${
        isMobile ? "w-full" : "w-72 mr-6 lg:mr-8 flex-shrink-0 flex-grow-0"
      }`}
      aria-label="Filter options"
    >
      <div
        className={`bg-black/80 backdrop-blur-md shadow-lg rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-800 ${
          isMobile ? "" : "sticky top-6 w-full"
        }`}
      >
        {!isMobile && (
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold text-white tracking-wide">
              Filters
            </h2>
            <button
              onClick={handleClearFilters}
              className="text-sm text-amber-500 hover:text-amber-400 transition-colors font-medium"
              aria-label="Clear all filters"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Specialty */}
        <div className="mb-5 sm:mb-6 border-b border-gray-800 pb-5 sm:pb-6">
          <div
            className="flex justify-between items-center mb-3 cursor-pointer"
            onClick={() => toggleSection("specialty")}
            role={isMobile ? "button" : undefined}
            aria-expanded={isMobile ? collapsedSections.specialty : undefined}
            aria-controls={isMobile ? "specialty-options" : undefined}
          >
            <h3 className="text-white font-medium tracking-wide">Specialty</h3>
            {isMobile && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-gray-400 transition-transform ${
                  collapsedSections.specialty ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                suppressHydrationWarning={true}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>

          {(!isMobile || collapsedSections.specialty) && (
            <div
              className="space-y-3 max-h-48 overflow-y-auto pr-2"
              id="specialty-options"
            >
              {specialties.map((specialty, index) => (
                <label
                  key={index}
                  className="flex items-center cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="radio"
                      name="specialty"
                      checked={filters.specialty === specialty}
                      onChange={() =>
                        handleFilterChange("specialty", specialty)
                      }
                      className="sr-only peer"
                      aria-label={`Filter for ${specialty} doctors`}
                    />
                    <div className="w-5 h-5 border-2 border-gray-600 rounded-full bg-gray-800 peer-checked:bg-amber-500 peer-checked:border-amber-500 group-hover:border-gray-500"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-white top-1.5 left-1.5 hidden peer-checked:block"></div>
                  </div>
                  <span className="ml-3 text-gray-300 group-hover:text-gray-100 transition-colors text-sm">
                    {specialty}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Gender Filter */}
        <div className="mb-5 sm:mb-6 border-b border-gray-800 pb-5 sm:pb-6">
          <div
            className="flex justify-between items-center mb-3 cursor-pointer"
            onClick={() => toggleSection("gender")}
            role={isMobile ? "button" : undefined}
            aria-expanded={isMobile ? collapsedSections.gender : undefined}
            aria-controls={isMobile ? "gender-options" : undefined}
          >
            <h3 className="text-white font-medium tracking-wide">Gender</h3>
            {isMobile && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-gray-400 transition-transform ${
                  collapsedSections.gender ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                suppressHydrationWarning={true}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>

          {(!isMobile || collapsedSections.gender) && (
            <div className="space-y-3" id="gender-options">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="gender"
                    checked={filters.gender === "male"}
                    onChange={() => handleFilterChange("gender", "male")}
                    className="sr-only peer"
                    aria-label="Filter for male doctors"
                  />
                  <div className="w-5 h-5 border-2 border-gray-600 rounded-full bg-gray-800 peer-checked:bg-amber-500 peer-checked:border-amber-500 group-hover:border-gray-500"></div>
                  <div className="absolute w-2 h-2 rounded-full bg-white top-1.5 left-1.5 hidden peer-checked:block"></div>
                </div>
                <span className="ml-3 text-gray-300 group-hover:text-gray-100 transition-colors">
                  Male Doctor
                </span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="gender"
                    checked={filters.gender === "female"}
                    onChange={() => handleFilterChange("gender", "female")}
                    className="sr-only peer"
                    aria-label="Filter for female doctors"
                  />
                  <div className="w-5 h-5 border-2 border-gray-600 rounded-full bg-gray-800 peer-checked:bg-amber-500 peer-checked:border-amber-500 group-hover:border-gray-500"></div>
                  <div className="absolute w-2 h-2 rounded-full bg-white top-1.5 left-1.5 hidden peer-checked:block"></div>
                </div>
                <span className="ml-3 text-gray-300 group-hover:text-gray-100 transition-colors">
                  Female Doctor
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Experience */}
        <div className="mb-5 sm:mb-6 border-b border-gray-800 pb-5 sm:pb-6">
          <div
            className="flex justify-between items-center mb-3 cursor-pointer"
            onClick={() => toggleSection("experience")}
            role={isMobile ? "button" : undefined}
            aria-expanded={isMobile ? collapsedSections.experience : undefined}
            aria-controls={isMobile ? "experience-options" : undefined}
          >
            <h3 className="text-white font-medium tracking-wide">
              Experience (In Years)
            </h3>
            {isMobile && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-gray-400 transition-transform ${
                  collapsedSections.experience ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                suppressHydrationWarning={true}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>

          {(!isMobile || collapsedSections.experience) && (
            <div className="flex flex-wrap gap-2" id="experience-options">
              {["0-5", "5-10", "10-15", "15+"].map((range) => (
                <button
                  key={range}
                  onClick={() => handleFilterChange("experience", range)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    filters.experience === range
                      ? "bg-amber-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="mb-5 sm:mb-6 border-b border-gray-800 pb-5 sm:pb-6">
          <div
            className="flex justify-between items-center mb-3 cursor-pointer"
            onClick={() => toggleSection("rating")}
            role={isMobile ? "button" : undefined}
            aria-expanded={isMobile ? collapsedSections.rating : undefined}
            aria-controls={isMobile ? "rating-options" : undefined}
          >
            <h3 className="text-white font-medium tracking-wide">Rating</h3>
            {isMobile && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-gray-400 transition-transform ${
                  collapsedSections.rating ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                suppressHydrationWarning={true}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>

          {(!isMobile || collapsedSections.rating) && (
            <div className="space-y-3" id="rating-options">
              {ratingOptions.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === option.value}
                      onChange={() =>
                        handleFilterChange("rating", option.value)
                      }
                      className="sr-only peer"
                      aria-label={`Filter doctors with rating ${option.label}`}
                    />
                    <div className="w-5 h-5 border-2 border-gray-600 rounded-full bg-gray-800 peer-checked:bg-amber-500 peer-checked:border-amber-500 group-hover:border-gray-500"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-white top-1.5 left-1.5 hidden peer-checked:block"></div>
                  </div>
                  <span className="ml-3 text-gray-300 group-hover:text-gray-100 transition-colors flex items-center">
                    <span className="mr-1">{option.label}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-amber-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Filter;
