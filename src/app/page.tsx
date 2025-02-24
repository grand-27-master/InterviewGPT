import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to the InterviewGPT</h1>
      <p className="text-lg text-gray-700 mb-4">Prepare for your interviews with AI-generated questions.</p>
      
      <div className="flex space-x-4">
        <Link href="/interview">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition">
            Start an Interview
          </button>
        </Link>
      </div>
    </main>
  );
}
