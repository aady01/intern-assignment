import type { DoctorFilterParams } from "./types";

export async function fetchDoctors(
  filters: DoctorFilterParams = {},
  page = 1,
  limit = 10
) {
  // Convert all filter values to strings
  const stringifiedFilters: Record<string, string> = {};

  // Add each filter as a string
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      stringifiedFilters[key] = String(value);
    }
  });

  // Add pagination params
  const params = new URLSearchParams({
    ...stringifiedFilters,
    page: String(page),
    limit: String(limit),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/list-doctor-with-filter?${params}`
  );
  if (!res.ok) throw new Error("Failed to fetch doctors");
  return res.json();
}

export async function addDoctor(doctor: {
  name: string;
  gender: string;
  experience: number;
  specialty: string;
  rating: number | string;
}) {
  // Simple data structure with rating converted to a number
  const doctorData = {
    name: doctor.name,
    gender: doctor.gender,
    experience: Number(doctor.experience),
    specialty: doctor.specialty,
    rating: Number(doctor.rating), // Convert rating to a number (Float)
  };

  // Use fetch instead of axios
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/add-doctor`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorData),
    }
  );

  // Handle response
  if (!response.ok) {
    // Get error details if possible
    let errorDetails = "";
    try {
      const errorData = await response.json();
      errorDetails = JSON.stringify(errorData);
    } catch {
      errorDetails = `Status ${response.status}: ${response.statusText}`;
    }

    throw new Error(`Failed to add doctor. ${errorDetails}`);
  }

  return response.json();
}
