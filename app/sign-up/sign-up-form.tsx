"use client";

import { useAuth } from "@/components/providers/supabase-auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";

const SignUpForm = () => {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { signUpWithEmail } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Check if passwords match
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Call signUpWithEmail function
      const error = await signUpWithEmail(email, password, userName);

      if (error) {
        setLoading(false);
        setError(error);
      } else {
        // Sign-up successful, you can now show a success message
        setSuccessMsg(
          "Sign-up successful! Please check your inbox and confirm your email."
        );
        // Optional: You can redirect the user to the login page after a successful sign-up
        // Optional: Add a delay and then redirect
        setTimeout(() => {
          setLoading(false);
          router.push("/login"); // Redirect to login page after 5 seconds
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full px-8 mt-16">
      {/* Main Container */}
      <div className="w-full max-w-lg bg-white p-6 rounded-md">
        {/* Text */}
        <h1 className="text-4xl font-bold">Sign Up</h1>

        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          {/* Inputs Container */}
          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Confirm password</Label>
              <Input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          </div>
          {/* Error */}
          {error && <div className="mt-4 text-red-500">{error}</div>}
          {/* Success message */}
          {successMsg && (
            <div className="mt-4 text-green-500">{successMsg}</div>
          )}
          {!loading ? (
            <Button
              variant="subtle"
              type="submit"
              className="flex items-center w-full gap-2 mt-6"
              onClick={() => handleSubmit}
            >
              Sign Up
            </Button>
          ) : (
            <div className="justify-center flex my-6">
              <Spinner loading={loading} />
            </div>
          )}
        </form>
        <div
          className="mt-4 text-center cursor-pointer"
          onClick={() => router.push("login")}
        >
          Already have an account?{" "}
          <span className="font-bold underline">Sign in</span>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
