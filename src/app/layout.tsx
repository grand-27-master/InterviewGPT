import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          termsPageUrl: "/terms",
          privacyPageUrl: "/privacy",
        },
      }}
    >
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <header className="p-4 bg-gray-100 flex justify-between items-center">
            <h1 className="text-xl font-semibold">My App</h1>
            <div>
              <SignedOut>
                <SignInButton mode="modal" />
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </header>
          <main className="flex-grow">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
