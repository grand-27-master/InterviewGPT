"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function QuestionsPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    // Retrieve stored questions
    const storedQuestions = sessionStorage.getItem("interviewQuestions");
    if (storedQuestions) setQuestions(JSON.parse(storedQuestions));
  }, []);

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Interview Questions for {jobId}</h2>
      <ul className="list-disc">
        {questions.length > 0 ? (
          questions.map((q, idx) => <li key={idx} className="mb-2">{q}</li>)
        ) : (
          <p>No questions found.</p>
        )}
      </ul>
    </div>
  );
}
