import InterviewRole from "./role"; 
import { JobRoleId } from "@/lib/constants/roles";

const roles: JobRoleId[] = ["Frontend Engineer", "Backend Engineer", "Full Stack Developer"];

export default function InterviewPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Interview Preparation</h1>
      <p className="text-gray-600 mb-6">Select a role to start your interview preparation.</p>
      <InterviewRole roles={roles} />
    </div>
  );
}
