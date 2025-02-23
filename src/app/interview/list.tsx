import { useEffect, useState } from "react";
import { InterviewSession } from "@/lib/types/index";
import Link from "next/link";

export default function InterviewList() {
  const [interviews, setInterviews] = useState<InterviewSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInterviews() {
      try {
        const response = await fetch("/api/interviews");
        const data = await response.json();
        if (data.success) {
          setInterviews(data.data);
        } else {
          setError("Failed to fetch interview sessions.");
        }
      } catch {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    }

    fetchInterviews();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading interviews...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Past Interview Sessions</h2>
      {interviews.length === 0 ? (
        <p className="text-gray-600">No interviews found.</p>
      ) : (
        <ul className="space-y-4">
          {interviews.map((interview) => (
            <li key={interview.id} className="p-4 border rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{interview.jobId}</h3>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(interview.date).toLocaleDateString()} | Difficulty: {interview.difficulty}
                  </p>
                  <p className={`mt-1 text-sm font-medium ${
                    interview.status === "completed" ? "text-green-600" :
                    interview.status === "in-progress" ? "text-blue-600" :
                    "text-red-600"
                  }`}>
                    Status: {interview.status}
                  </p>
                </div>
                <Link href={`/interview/${interview.id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
