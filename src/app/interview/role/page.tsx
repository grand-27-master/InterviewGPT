import InterviewRole from "./role"; 
import { JobRoleId } from "@/lib/constants/roles";

const roles: JobRoleId[] = ["Frontend Engineer", "Backend Engineer", "Full Stack Developer", "DevOps Engineer", "Cybersecurity Analyst", "Data Scientist", "Machine Learning Engineer", "Product Manager", "UX Designer", "UI Designer", "iOS Developer", "Android Developer"];

export default function InterviewPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Interview Preparation</h1>
      <InterviewRole roles={roles} />
    </div>
  );
}
