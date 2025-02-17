import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    // Main container with gradient background matching sign-in page
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Content container with responsive width */}
      <div className="max-w-4xl w-full">
        {/* Navigation for existing users */}
        <div className="absolute top-4 right-4">
          <Link 
            href="/sign-in" 
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1"
          >
            <span>Already have an account?</span>
            <span className="font-medium text-blue-600 hover:text-blue-700">
              Sign in
            </span>
          </Link>
        </div>

        {/* Two-column layout for desktop */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left column: Branding and benefits */}
          <div className="hidden md:flex flex-col items-center space-y-6">
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

            {/* Value proposition */}
            <div className="text-center space-y-3">
              <h1 className="text-2xl font-bold text-gray-900">
                Join InterviewGPT Today
              </h1>
              <p className="text-gray-600 max-w-sm">
                Prepare smarter for your interviews with AI-powered question generation
              </p>
            </div>

            {/* Benefits section */}
            <div className="space-y-4 w-full max-w-sm">
              {/* Each benefit is a card with icon and text */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full shrink-0">
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
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Smart Question Generation
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Get tailored questions based on your specific role and experience level
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full shrink-0">
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
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Customize Your Preparation
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Adjust difficulty levels and focus areas to match your needs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Sign-up form */}
          <div className="w-full max-w-sm mx-auto">
            <SignUp
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
              // Redirect after successful sign-up
              redirectUrl="/dashboard"
              // Enable sign-in option
              signInUrl="/sign-in"
            />
          </div>
        </div>
      </div>
    </div>
  );
}