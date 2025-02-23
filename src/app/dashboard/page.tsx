"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ExtendedUser, InterviewSession } from "@/lib/types";
import { getUserData } from "@/lib/api";
import Link from "next/link";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setError("User ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await getUserData(userId);
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!user) {
    return <p className="text-center text-red-500">User data is not available.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.firstName}!</h1>

      <section className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Last Activity</h2>
        <p className="text-gray-700">{new Date(user.lastActivity).toLocaleString()}</p>
      </section>

      <section className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Interview History</h2>
        {user.interviewHistory.length > 0 ? (
          <ul className="space-y-4">
            {user.interviewHistory.map((session: InterviewSession) => (
              <li key={session.id} className="p-4 border rounded-lg shadow-sm bg-white">
                <p className="text-gray-700">
                  <strong>Job Role:</strong> {session.jobId}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong> {session.status}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong> {new Date(session.date).toLocaleDateString()}
                </p>
                <Link href={`/interview/${session.id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No interviews found.</p>
        )}
      </section>

      <section className="text-center">
        <Link href="app/interview">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
            Start New Interview
          </button>
        </Link>
      </section>
    </div>
  );
}
