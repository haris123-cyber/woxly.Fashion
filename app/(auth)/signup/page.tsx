import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = { title: "Create Account" };

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <SignupForm />
    </div>
  );
}
