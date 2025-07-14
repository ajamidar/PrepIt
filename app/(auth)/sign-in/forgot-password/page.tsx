'use client';
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Reset link sent to your email.");
      toast.success('Reset link sent, redirecting you to sign-in')
      router.push('/sign-in');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-0 p-6 dark-gradient rounded form h-full flex flex-col gap-2 ">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="w-full py-2 rounded btn-secondary">
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-4 text-l font-bold text-[#22ff00]">{message}</p>}
    </div>
  );
}
