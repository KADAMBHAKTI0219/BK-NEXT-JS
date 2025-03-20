"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div>
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="First Name"
        value={userData.firstName}
        onChange={(e) => updateField("firstName", e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={userData.lastName}
        onChange={(e) => updateField("lastName", e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={userData.email}
        onChange={(e) => updateField("email", e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={userData.password}
        onChange={(e) => updateField("password", e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={userData.passwordConfirmation}
        onChange={(e) => updateField("passwordConfirmation", e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
      />
      {userData.imagePreview && <img src={userData.imagePreview} alt="Preview" width="100" />}
      <button
        onClick={() => {
          setLoading(true);
          // Fake signup logic (replace with API call)
          setTimeout(() => {
            setLoading(false);
            router.push("/dashboard"); // Redirect after signup
          }, 2000);
        }}
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </div>
  );
}
