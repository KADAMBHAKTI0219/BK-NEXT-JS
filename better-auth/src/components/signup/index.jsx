"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function SignUp() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    image: null,
    imagePreview: null,
    imageBase64: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Update form field values
  const updateField = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle image upload and preview
  const handleImageChange = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = (event) => {
      setUserData((prev) => ({
        ...prev,
        image: file,
        imagePreview: event.target.result,
        imageBase64: event.target.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="border border-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-lg md:text-xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* First Name */}
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={userData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={userData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                value={userData.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={userData.password}
                onChange={(e) => updateField("password", e.target.value)}
              />
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
              <Label htmlFor="passwordConfirmation">Confirm Password</Label>
              <Input
                id="passwordConfirmation"
                type="password"
                placeholder="********"
                value={userData.passwordConfirmation}
                onChange={(e) => updateField("passwordConfirmation", e.target.value)}
              />
            </div>

            {/* Image Upload */}
            <div className="grid gap-2">
              <Label htmlFor="image">Profile Picture</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
              />
              {userData.imagePreview && (
                <Image
                  src={userData.imagePreview}
                  alt="Profile Preview"
                  width={100}
                  height={100}
                  className="rounded-full mt-2 mx-auto"
                />
              )}
            </div>

            {/* Sign Up Button */}
            <Button
              className="w-full"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                // Fake signup logic (replace with API call)
                setTimeout(() => {
                  setLoading(false);
                  router.push("/signin");
                }, 2000);
              }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign Up"}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center text-neutral-500 text-sm w-full">
            Already have an account? <a href="/signin" className="underline">Sign in</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
