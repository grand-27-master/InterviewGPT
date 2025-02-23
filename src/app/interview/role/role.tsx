'use client';

import { useState } from "react";
import { JobRoleId } from "@/lib/constants/roles";

export default function InterviewRole({ roles }: { roles: JobRoleId[] }) {
  const [selectedRole, setSelectedRole] = useState<JobRoleId | "">("");
  const [questions, setQuestions] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStartInterview = async () => {
    if (!selectedRole) return;
    
    setLoading(true);
    
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      });

      if (!res.ok) throw new Error("Failed to fetch questions");

      const data = await res.json();

      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error("No questions received");
      }

      setQuestions(data.questions);
    } catch (error) {
      console.error("❌ Error generating questions:", error);
      setQuestions(["Failed to generate questions. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Select Your Role</h2>
      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value as JobRoleId)}
        className="border p-2 rounded-md w-64 mb-4"
      >
        <option value="" disabled>Select a role</option>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <button
        onClick={handleStartInterview}
        disabled={!selectedRole || loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
      >
        {loading ? "Generating..." : "Start Interview"}
      </button>

      {/* Display questions only if they exist */}
      {questions && questions.length > 0 && (
        <div className="mt-6 w-full max-w-2xl p-4 border rounded-md bg-gray-100">
          <h3 className="text-xl font-bold mb-2">Generated Questions:</h3>
          <ul className="list-disc pl-5 space-y-2">
            {questions.map((q, index) => (
              <li key={index}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
