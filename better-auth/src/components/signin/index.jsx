"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";


const SignIn = () => {
      const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        rememberMe: false,
      });
      const [loading, setLoading] = useState(false);
      const router = useRouter()
      const updateField = (field, value) => {
        setCredentials((prev) => ({ ...prev, [field]: value }));
      };
    
  return (
    <div  className="flex justify-center items-center min-h-screen">
       <Card className="border border-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {/* Email Input */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"  
              placeholder="m@example.com"
              required
              value={credentials.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-sm ml-auto underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={(e) => updateField("password", e.target.value)}
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex gap-2 items-center">
            <Checkbox
              id="remember"
              checked={credentials.rememberMe}
              onClick={() => updateField("rememberMe", !credentials.rememberMe)}
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await signIn.email({ email: credentials.email, password: credentials.password });
              setLoading(false);
              router.push("/dashboard");
            }}
            
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Login"}
          </Button>

          {/* Sign in with GitHub */}
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={async () => {
              await signIn.social({ provider: "github", callbackURL: "/api/auth/callback/github" });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
              />
            </svg>
            Sign in with GitHub
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex border-t justify-center w-full py-4">
          <p className="text-center text-neutral-500 text-xs">
            Powered by{" "}
            <Link href="https://better-auth.com" className="underline" target="_blank">
              <span className="dark:text-orange-200/90">better-auth.</span>
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

export default SignIn
