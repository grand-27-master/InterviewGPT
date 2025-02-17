"use client";

import { useState } from "react";
import { JobRoleId } from "@/lib/constants/roles";
import { useRouter } from "next/navigation";

export default function InterviewRole({ roles }: { roles: JobRoleId[] }) {
  const [selectedRole, setSelectedRole] = useState<JobRoleId | "">("");
  const router = useRouter();

  const handleStartInterview = () => {
    if (!selectedRole) return;
    router.push(`/interview/questions?jobId=${selectedRole}`);
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
        disabled={!selectedRole}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
      >
        Start Interview
      </button>
    </div>
  );
}
