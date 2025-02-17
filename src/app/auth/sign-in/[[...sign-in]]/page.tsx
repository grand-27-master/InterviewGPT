import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

// The sign-in page component provides authentication functionality
// while maintaining consistent branding and user experience
export default function SignInPage() {
  return (
    // Main container with a gradient background and full viewport height
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Content container with max width for larger screens */}
      <div className="max-w-4xl w-full">
        {/* Grid layout for logo and sign-in form */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side: Branding and welcome message */}
          <div className="hidden md:flex flex-col items-center space-y-4">
            {/* Logo section */}
            <div className="mb-8">
              <Image
                src="/images/logo.svg"
                alt="InterviewGPT Logo"
                width={200}
                height={60}
                priority
              />
            </div>
            
            {/* Welcome text */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome to InterviewGPT
              </h1>
              <p className="text-gray-600 max-w-sm">
                Generate tailored interview questions and prepare for your next career move
              </p>
            </div>

            {/* Feature highlights */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-600">Role-specific questions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-gray-600">AI-powered insights</span>
              </div>
            </div>
          </div>

          {/* Right side: Sign-in component */}
          <div className="w-full max-w-sm mx-auto">
            <SignIn
              appearance={{
                elements: {
                  // Customize Clerk's appearance to match your brand
                  card: "shadow-none",
                  rootBox: "w-full",
                  formButtonPrimary: 
                    "bg-blue-600 hover:bg-blue-700 text-white",
                  socialButtonsBlockButton: 
                    "border border-gray-300 hover:bg-gray-50",
                  formFieldInput: 
                    "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
                  footer: "hidden",
                },
              }}
              // Redirect after successful sign-in
              redirectUrl="/dashboard"
              // Enable sign-up option
              signUpUrl="/sign-up"
            />
          </div>
        </div>
      </div>
    </div>
  );
}