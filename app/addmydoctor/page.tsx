"use client";
import React, { useState } from "react";
import { DM_Sans } from "next/font/google";
import { addDoctor } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Initialize DM Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export default function AddDoctorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    gender: "",
    experience: "",
    specialty: "",
    rating: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Basic validation
      if (
        !newDoctor.name ||
        !newDoctor.gender ||
        !newDoctor.specialty ||
        !newDoctor.experience
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Ensure rating is a number
      const rating = newDoctor.rating ? parseFloat(newDoctor.rating) : 3.5;

      // Send data with rating as a number
      await addDoctor({
        name: newDoctor.name,
        gender: newDoctor.gender,
        experience: parseInt(newDoctor.experience),
        specialty: newDoctor.specialty,
        rating: rating, // Now a number
      });

      // Success flow
      setSuccess(true);
      setNewDoctor({
        name: "",
        gender: "",
        experience: "",
        specialty: "",
        rating: "",
      });

      // Redirect after success
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } catch (err) {
      // Simple error handling
      setError(err instanceof Error ? err.message : "Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${dmSans.variable} min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white`}
    >
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 text-transparent bg-clip-text">
              Add New Doctor
            </h1>
            <p className="text-gray-400 mt-2">
              Fill in the details to add a new doctor to our platform
            </p>
          </div>
          <Link
            href="/home"
            className="flex items-center bg-gray-800/80 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to Doctors
          </Link>
        </div>

        <div className="bg-black/70 backdrop-blur-lg shadow-2xl rounded-2xl border border-gray-800/50 overflow-hidden">
          {/* Form header with decorative element */}
          <div className="h-2 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400"></div>

          <div className="p-6 sm:p-10">
            {success && (
              <div className="mb-8 bg-green-900/40 text-green-200 p-6 rounded-xl border border-green-700/50 flex items-center">
                <div className="mr-4 bg-green-500/20 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="font-medium">
                  Doctor added successfully! Redirecting...
                </p>
              </div>
            )}

            {error && (
              <div className="mb-8 bg-red-900/40 text-red-200 p-6 rounded-xl border border-red-700/50 flex items-center">
                <div className="mr-4 bg-red-500/20 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-gray-300 font-medium"
                  >
                    Doctor Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newDoctor.name}
                    onChange={(e) =>
                      setNewDoctor((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full bg-gray-800/30 border border-gray-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:outline-none transition-all"
                    placeholder="Full Name"
                    required
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label
                    htmlFor="gender"
                    className="block text-gray-300 font-medium"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={newDoctor.gender}
                    onChange={(e) =>
                      setNewDoctor((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    className="w-full bg-gray-800/30 border border-gray-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:outline-none transition-all"
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <label
                    htmlFor="experience"
                    className="block text-gray-300 font-medium"
                  >
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    id="experience"
                    value={newDoctor.experience}
                    onChange={(e) =>
                      setNewDoctor((prev) => ({
                        ...prev,
                        experience: e.target.value,
                      }))
                    }
                    className="w-full bg-gray-800/30 border border-gray-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:outline-none transition-all"
                    placeholder="5"
                    min="0"
                    max="60"
                    required
                  />
                </div>

                {/* Specialty */}
                <div className="space-y-2">
                  <label
                    htmlFor="specialty"
                    className="block text-gray-300 font-medium"
                  >
                    Specialty
                  </label>
                  <select
                    id="specialty"
                    value={newDoctor.specialty}
                    onChange={(e) =>
                      setNewDoctor((prev) => ({
                        ...prev,
                        specialty: e.target.value,
                      }))
                    }
                    className="w-full bg-gray-800/30 border border-gray-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:outline-none transition-all"
                    required
                  >
                    <option value="" disabled>
                      Select Specialty
                    </option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="rating"
                    className="block text-gray-300 font-medium"
                  >
                    Rating (1-5)
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      id="rating"
                      value={newDoctor.rating || "3.5"}
                      min="1"
                      max="5"
                      step="0.1"
                      onChange={(e) =>
                        setNewDoctor((prev) => ({
                          ...prev,
                          rating: e.target.value,
                        }))
                      }
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      required
                    />
                    <span className="ml-4 bg-amber-500 text-white font-bold rounded-lg px-3 py-1 min-w-[60px] text-center">
                      {newDoctor.rating || "3.5"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 px-1">
                    <span>Poor</span>
                    <span>Average</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 font-medium text-lg ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding Doctor...
                    </div>
                  ) : (
                    "Add Doctor"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
