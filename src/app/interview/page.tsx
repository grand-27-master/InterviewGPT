"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function InterviewPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid rendering mismatched server/client content

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Interview Preparation</h1>
      <p className="text-gray-600 mb-6">Select a role to start your interview preparation.</p>
      
      <Link href="/interview/role">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Choose Role
        </button>
      </Link>
    </div>
  );
}
