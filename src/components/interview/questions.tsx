import { useEffect, useState } from "react";
import { InterviewQuestion } from "@/lib/types/index";

export default function InterviewQuestions({ jobId }: { jobId: string }) {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(`/api/questions?jobId=${jobId}`);
        const data = await response.json();
        if (data.success) {
          setQuestions(data.questions);
        } else {
          setError("Failed to fetch questions.");
        }
      } catch {
        setError("An error occurred while fetching questions.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [jobId]);

  if (loading) return <p className="text-center text-gray-500">Loading questions...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Interview Questions</h2>
      {questions.length === 0 ? (
        <p className="text-gray-600">No questions available.</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((question, index) => (
            <li key={question.id} className="p-4 border rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">
                Question {index + 1}: {question.question}
              </h3>
              <p className="text-sm text-gray-500">
                Category: {question.category} | Difficulty: {question.difficulty}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
