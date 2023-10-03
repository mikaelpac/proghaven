"use client";

import { useAuth } from "@/components/providers/supabase-auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { signInWithEmail, signInWithGithub, signInWithSpotify, user } =
    useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const error = await signInWithEmail(email, password);
      if (error) {
        setError(error);
      }
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  // Check if there is a user
  useEffect(() => {
    if (user) {
      console.log(user);
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center w-full h-full px-8 mt-16">
      {/* Main Container */}
      <div className="w-full max-w-lg bg-white p-6 rounded-md">
        {/* Text */}

        <h1 className="text-4xl font-bold">Login</h1>

        {/* Github Button */}
        <Button
          onClick={signInWithSpotify}
          variant="spotify"
          className="flex items-center w-full gap-2 mt-6"
        >
          Login with Spotify
        </Button>
        {/* Seperator */}
        <div className="flex items-center my-8">
          <Separator /> <span className="mx-6">OR</span> <Separator />
        </div>
        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          {/* Inputs Container */}
          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {/* Error */}
          {error && <div className="mt-4 text-red-500">{error}</div>}
          <Button
            variant="subtle"
            type="submit"
            className="flex items-center w-full gap-2 mt-6"
          >
            Login with Email
            <Mail size="16" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
