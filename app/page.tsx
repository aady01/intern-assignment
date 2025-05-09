"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /home after a short delay
    const timeout = setTimeout(() => {
      router.push("/home");
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center">
      {/* Main text */}
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-8 animate-pulse">
        Redirecting...
      </h1>

      {/* Loading spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-amber-500 rounded-full animate-spin"></div>
      </div>

      {/* Optional subtext */}
      <p className="mt-4 text-gray-400 text-lg">
        Taking you to the home page...
      </p>
    </div>
  );
}
