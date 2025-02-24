"use client";

import { useState} from "react";
import { JobRoleId } from "@/lib/constants/roles";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: unknown) => void;
}

export default function InterviewRole({ roles }: { roles: JobRoleId[] }) {
  const [selectedRole, setSelectedRole] = useState<JobRoleId | "">("");
  const [questions, setQuestions] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const handleStartInterview = async () => {
    if (!selectedRole) return;

    setLoading(true);
    setShowDownload(false);

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

      setQuestions(data.questions.slice(0, 6));
      setShowDownload(true);
    } catch (error) {
      console.error("❌ Error generating questions:", error);
      setQuestions(["Failed to generate questions. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!questions || questions.length === 0) return;
    const doc = new jsPDF() as jsPDFWithAutoTable;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Generated Interview Questions", 20, 20);
    doc.setFontSize(12);
    doc.text(`Role: ${selectedRole}`, 20, 30);

    doc.autoTable({
      startY: 40,
      head: [["#", "Question"]],
      body: questions.map((q, index) => [index + 1, q]),
      theme: "grid",
    });

    doc.save(`Interview_Questions_${selectedRole}.pdf`);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900">
        🎯 Select Your Role
      </h2>
      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value as JobRoleId)}
        className="border p-3 rounded-md w-72 mb-6 bg-white shadow-lg focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <option value="" disabled>
          Select a role
        </option>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <button
        onClick={handleStartInterview}
        disabled={!selectedRole || loading}
        className={`px-6 py-3 rounded-md font-semibold shadow-md transition-all ${
          loading
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "Generating..." : "🚀 Start Interview"}
      </button>

      {/* Questions Display */}
      {questions && questions.length > 0 && (
        <div className="mt-8 w-full max-w-2xl p-6 border rounded-lg bg-white shadow-xl backdrop-blur-lg animate-fade-in">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            ✅ Generated Questions:
          </h3>
          <ul className="space-y-4">
            {questions.map((q, index) => (
              <li
                key={index}
                className="flex items-start space-x-3 bg-gray-50 p-4 rounded-md shadow-md transition-all hover:bg-gray-100"
              >
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </span>
                <p className="flex-1 text-lg font-medium">{q}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Download PDF Button */}
      {showDownload && (
        <button
          onClick={handleDownloadPDF}
          className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition-all"
        >
          📄 Download as PDF
        </button>
      )}
    </div>
  );
}
