"use client";
import React from "react";
import { Doctor } from "@/app/lib/types";
import { DM_Sans } from "next/font/google";
import Image from "next/image";

// Initialize DM Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div
      className={`${dmSans.variable} bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-700 overflow-hidden hover:border-amber-500/50 transition-all shadow-md hover:shadow-amber-500/10`}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Doctor Image and Quick Info */}
        <div className="sm:w-1/3 relative">
          <div className="relative h-48 sm:h-full min-h-[160px]">
            <Image
              src={doctor.imageUrl || "/dpp.jpg"}
              alt={`Dr. ${doctor.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
              <div className="flex items-center">
                <div className="bg-amber-500 text-black font-bold rounded-md px-2 py-1 text-sm">
                  {doctor.rating.toFixed(1)}
                </div>
                <span className="text-white text-sm ml-2">
                  {/* This would be from actual reviews */}
                  {Math.floor(Math.random() * 100) + 50} Reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="p-4 sm:p-5 flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">
                {doctor.name}
              </h3>
              <p className="text-amber-400 text-sm">{doctor.specialty}</p>
            </div>
            <div className="mt-2 sm:mt-0 bg-gray-900/60 rounded-lg px-3 py-1 text-gray-300 text-sm">
              {doctor.experience} Years Exp
            </div>
          </div>

          {/* Languages */}
          <div className="mt-3 flex flex-wrap gap-1">
            {doctor.languages && doctor.languages.length > 0 ? (
              <>
                {doctor.languages.slice(0, 3).map((lang, index) => (
                  <span
                    key={index}
                    className="bg-gray-900/60 text-xs rounded-full px-2 py-0.5 text-gray-300"
                  >
                    {lang}
                  </span>
                ))}
                {doctor.languages.length > 3 && (
                  <span className="bg-gray-900/60 text-xs rounded-full px-2 py-0.5 text-gray-300">
                    +{doctor.languages.length - 3} more
                  </span>
                )}
              </>
            ) : (
              <span className="bg-gray-900/60 text-xs rounded-full px-2 py-0.5 text-gray-300">
                English
              </span>
            )}
          </div>

          {/* Consultation Options */}
          <div className="mt-3 flex flex-wrap gap-2">
            {doctor.isHospitalVisitAvailable && (
              <div className="flex items-center text-xs bg-gray-700/50 rounded-md px-2 py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Hospital Visit
              </div>
            )}
            {doctor.isOnlineConsultAvailable && (
              <div className="flex items-center text-xs bg-gray-700/50 rounded-md px-2 py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Online Consult
              </div>
            )}
          </div>

          {/* Fee and Book Button */}
          <div className="mt-4 pt-3 border-t border-gray-700 flex justify-between items-center">
            <div>
              <span className="text-gray-400 text-xs">Consultation Fee</span>
              <p className="text-white font-semibold">
                ₹{doctor.consultationFee}
              </p>
            </div>
            <button className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white py-2 px-4 rounded-lg text-sm transition-all shadow-md hover:shadow-amber-500/20">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
