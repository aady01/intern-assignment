export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  gender: "male" | "female" | "other";
  imageUrl: string;
  rating: number;
  consultationFee: number;
  hospitalName?: string;
  languages: string[];
  location?: string;
  availableSlots?: { day: string; time: string }[];
  isOnlineConsultAvailable: boolean;
  isHospitalVisitAvailable: boolean;
  education?: string;
  bio?: string;
}

export interface DoctorFilterParams {
  gender?: string;
  specialty?: string;
  experience?: string;
  language?: string;
  isOnlineConsult?: boolean;
  isHospitalVisit?: boolean;
  rating?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
