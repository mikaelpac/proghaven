"use client";

import { useAuth } from "@/components/providers/supabase-auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { signInWithEmail, signInWithGithub, signInWithSpotify, user } =
    useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const error = await signInWithEmail(email, password);
      if (error) {
        setLoading(false);
        setError(error);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      console.log("Something went wrong!");
    }
  };

  // Check if there is a user
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center w-full h-full px-8 mt-16">
      <div className="w-full max-w-lg bg-white p-6 rounded-md">
        <h1 className="text-4xl font-bold">Login</h1>

        <Button
          onClick={signInWithSpotify}
          variant="spotify"
          className="flex items-center w-full gap-2 mt-6"
        >
          Login with Spotify
        </Button>

        <div className="flex flex-col my-8 text-center">
          <Separator />
          <span className="mt-4">OR</span>{" "}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-6 space-y-3">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                className="w-full"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                className="w-full"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="mt-4 text-red-500">{error}</div>}

          {!loading ? (
            <Button
              /*  variant="subtle" */
              type="submit"
              className="flex items-center w-full gap-2 mt-6"
            >
              Login with Email
              <Mail size="16" />
            </Button>
          ) : (
            <div className="justify-center flex my-6">
              <Spinner loading={loading} />
            </div>
          )}
        </form>
        <div
          className="mt-4 text-center cursor-pointer"
          onClick={() => router.push("sign-up")}
        >
          Don&apos;t have an account?{" "}
          <span className="font-bold underline">Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
