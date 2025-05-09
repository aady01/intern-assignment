"use client";
import React, { useState } from "react";
import { DM_Sans } from "next/font/google";

// Initialize DM Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

interface FilterProps {
  isMobile?: boolean;
}

const Filter = ({ isMobile = false }: FilterProps) => {
  // State to track if language section is expanded
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({
    consult: true, // Start expanded for better UX
    experience: false,
    fees: false,
    language: false,
    facility: false,
  });

  // Toggle section visibility (for mobile accordion)
  const toggleSection = (section: string) => {
    if (isMobile) {
      setCollapsedSections({
        ...collapsedSections,
        [section]: !collapsedSections[section],
      });
    }
  };

  // Languages list
  const languages = [
    "English",
    "Hindi",
    "Telugu",
    "Punjabi",
    "Bengali",
    "Marathi",
    "Urdu",
    "Gujarati",
    "Tamil",
    "Kannada",
    "Odia",
    "Persian",
    "Assamese",
  ];

  // Determine which languages to show
  const visibleLanguages = showAllLanguages ? languages : languages.slice(0, 4);

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
              className="text-sm text-amber-500 hover:text-amber-400 transition-colors font-medium"
              aria-label="Clear all filters"
            >
              Clear All
            </button>
          </div>
        )}

        <button
          className="w-full bg-gray-800/90 hover:bg-orange-400/90 text-white py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl mb-5 sm:mb-6 flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
          aria-label="Show doctors near my location"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
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
          </svg>
          Show Doctors Near Me
        </button>

        {/* Mode of Consult */}
        <div className="mb-5 sm:mb-6 border-b border-gray-800 pb-5 sm:pb-6">
          <div
            className="flex justify-between items-center mb-3 cursor-pointer"
            onClick={() => toggleSection("consult")}
            role={isMobile ? "button" : undefined}
            aria-expanded={isMobile ? collapsedSections.consult : undefined}
            aria-controls={isMobile ? "consult-options" : undefined}
          >
            <h3 className="text-white font-medium tracking-wide">
              Mode of Consult
            </h3>
            {isMobile && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-gray-400 transition-transform ${
                  collapsedSections.consult ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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

          {(!isMobile || collapsedSections.consult) && (
            <div className="space-y-3" id="consult-options">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                    aria-label="Filter by hospital visits"
                  />
                  <div className="w-5 h-5 border-2 border-gray-600 rounded-md bg-gray-800 peer-checked:bg-amber-500 peer-checked:border-amber-500 group-hover:border-gray-500"></div>
                  <svg
                    className="absolute w-3 h-3 text-white top-1 left-1 hidden peer-checked:block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="ml-3 text-gray-300 group-hover:text-gray-100 transition-colors">
                  Hospital Visit
                </span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                    aria-label="Filter by online consultations"
                  />
                  <div className="w-5 h-5 border-2 border-gray-600 rounded-md bg-gray-800 peer-checked:bg-amber-500 peer-checked:border-amber-500 group-hover:border-gray-500"></div>
                  <svg
                    className="absolute w-3 h-3 text-white top-1 left-1 hidden peer-checked:block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="ml-3 text-gray-300 group-hover:text-gray-100 transition-colors">
                  Online Consult
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Experience - similar accordion pattern */}
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
            <div className="space-y-3" id="experience-options">
              {/* Experience checkboxes */}
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    aria-label="Filter doctors with 0-5 years of experience"
                  />
                  <div className="w-5 h-5 border-2 border-gray-600 rounded-md bg-gray-800 peer-checked:bg-amber-500 peer-checked:border-amber-500 group-hover:border-gray-500"></div>
                  <svg
                    className="absolute w-3 h-3 text-white top-1 left-1 hidden peer-checked:block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="ml-3 text-gray-300 group-hover:text-gray-100 transition-colors">
                  0-5
                </span>
              </label>
              {/* Repeat pattern for other options */}
            </div>
          )}
        </div>

        {/* Similar pattern for other filter sections */}

        {/* Language - Collapsible Section */}
        <div className="mb-5 sm:mb-6 border-b border-gray-800 pb-5 sm:pb-6">
          <div
            className="flex justify-between items-center mb-3 cursor-pointer"
            onClick={() => toggleSection("language")}
            role={isMobile ? "button" : undefined}
            aria-expanded={isMobile ? collapsedSections.language : undefined}
            aria-controls={isMobile ? "language-options" : undefined}
          >
            <h3 className="text-white font-medium tracking-wide">Language</h3>
            {isMobile && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-gray-400 transition-transform ${
                  collapsedSections.language ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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

          {(!isMobile || collapsedSections.language) && (
            <div className="space-y-3" id="language-options">
              {/* Map through visible languages */}
              {visibleLanguages.map((language, index) => (
                <label
                  key={index}
                  className="flex items-center cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      aria-label={`Filter doctors who speak ${language}`}
                    />
                    <div className="w-5 h-5 border-2 border-gray-600 rounded-md bg-gray-800 peer-checked:bg-amber-500 peer-checked:border-amber-500 group-hover:border-gray-500"></div>
                    <svg
                      className="absolute w-3 h-3 text-white top-1 left-1 hidden peer-checked:block"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-300 group-hover:text-gray-100 transition-colors">
                    {language}
                  </span>
                </label>
              ))}

              {/* Toggle button with dynamic text */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllLanguages(!showAllLanguages);
                }}
                className="flex items-center text-cyan-400 text-sm hover:text-cyan-300 transition-colors mt-2 font-medium"
                aria-expanded={showAllLanguages}
                aria-controls="expanded-languages"
              >
                {showAllLanguages ? (
                  <>
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
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    Show Less
                  </>
                ) : (
                  <>
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    +{languages.length - 4} More
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Filter;
