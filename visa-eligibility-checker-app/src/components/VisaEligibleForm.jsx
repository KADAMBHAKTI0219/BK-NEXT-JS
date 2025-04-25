"use client";
import React, { useState } from "react";
import { visaEligibleHeading, visaFormData } from "@/data/visaElgible";

const backgroundValue = [
  {
    country: "India 🇮🇳",
    backgroundValue: "bg-gradient-to-r from-orange-200 via-white to-green-200",
  },
  { country: "USA 🇺🇸", backgroundValue: "bg-gradient-to-r from-blue-200 to-red-200" },
  { country: "UK 🇬🇧", backgroundValue: "bg-gradient-to-r from-red-200 to-blue-200" },
  { country: "Australia 🇦🇺", backgroundValue: "bg-gradient-to-r from-red-200 to-blue-200" },
  { country: "Germany 🇩🇪", backgroundValue: "bg-gradient-to-r from-gray-300 via-red-200 to-yellow-200" },
];

const VisaEligibleForm = () => {
  const [selectedCountry, setSelectedCountry] = useState(""); // Start with no country selected
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [eligibleMessage, setEligibleMessage] = useState("");
  const [lastBackgroundStyle, setLastBackgroundStyle] = useState("bg-gray-100");

  // Get background based on selected country
  const selectedCountryLabel = visaFormData[2].options.find(
    (opt) => opt.value === selectedCountry
  )?.label;
  const backgroundStyle = backgroundValue.find(
    (bg) => bg.country === selectedCountryLabel
  )?.backgroundValue || "bg-gray-100";

  const validateForm = () => {
    const newErrors = {};
    visaFormData.forEach((field) => {
      const value = formData[field.placeholder];
      if (field.placeholder === "Enter Your Mobile Number") {
        if (!value || !/^\d{10}$/.test(value)) {
          newErrors[field.placeholder] = "Please enter a valid 10-digit mobile number.";
        }
      } else if (!value || (field.options && value === "")) {
        newErrors[field.placeholder] = `${field.label} is required.`;
      }
    });
    return newErrors;
  };

  const checkEligibility = (data) => {
    const age = parseInt(data["Age"] || "0");
    const education = data["Education"] || "";
    const experience = parseInt(data["Experience In Years"] || "0");
    const visaType = data["Visa Type"] || "";
    const migrateTo = data["Migrate To"] || "";

    // Simple eligibility criteria
    const isEligible =
      age >= 18 &&
      age <= 45 &&
      ["PHD/DOCTORATE", "Master", "Post Graduation", "Graduation"].includes(education) &&
      experience >= 1 &&
      visaType === "Permanent Residency Visa" &&
      ["Canada", "Australia", "Germany"].includes(migrateTo);

    return isEligible
      ? "You Are Eligible For Visa"
      : "You Are Not Eligible For Visa";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const finalData = {
      ...formData,
      "Enter Your Mobile Number": `${selectedCountry} ${formData["Enter Your Mobile Number"] || ""}`,
    };
    localStorage.setItem("visaFormData", JSON.stringify(finalData));
    setEligibleMessage(checkEligibility(finalData));
    setLastBackgroundStyle(backgroundStyle);
    setErrors({});
    setSubmitted(true);
    setFormData({});
    setSelectedCountry("");
    setTimeout(() => {
      setSubmitted(false);
      setEligibleMessage("");
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  return (
    <div className="px-10 py-10">
      <style jsx>{`
        @keyframes slideIn {
          0% { transform: translateX(-20px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .eligibility-message {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
      <div className="space-y-4">
        <h1 className="text-center text-4xl font-bold">{visaEligibleHeading.title}</h1>
        <h3 className="text-center text-2xl">{visaEligibleHeading.subTitle}</h3>
      </div>
      {submitted && (
        <p className="text-green-600 text-center mt-4">
          Form submitted successfully! Data saved.
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className={`mt-8 max-w-xl mx-auto space-y-4 p-4 rounded-xl ${backgroundStyle} transition-colors duration-300`}
      >
        {visaFormData.map((formdata, index) => (
          <div key={index} className="flex flex-col">
            <label
              htmlFor={formdata.placeholder}
              className="mb-1 font-medium"
              aria-label={formdata.label}
            >
              {formdata.label}
            </label>
            {formdata.options ? (
              formdata.placeholder === "Country" ? (
                <select
                  id={formdata.placeholder}
                  name={formdata.placeholder}
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setFormData({ ...formData, [formdata.placeholder]: e.target.value });
                  }}
                  className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-required="true"
                >
                  <option value="">Select Country</option>
                  {formdata.options.map((option, optIndex) => (
                    <option key={optIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  id={formdata.placeholder}
                  name={formdata.placeholder}
                  value={formData[formdata.placeholder] || ""}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-required="true"
                >
                  <option value="">Select {formdata.label}</option>
                  {formdata.options.map((option, optIndex) => (
                    <option key={optIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )
            ) : formdata.placeholder === "Enter Your Mobile Number" ? (
              <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                <span className="p-2 bg-gray-100 border-r" aria-hidden="true">
                  {selectedCountry || "+91"}{" "}
                  {visaFormData[2].options.find((opt) => opt.value === (selectedCountry || "+91"))
                    ?.flag}
                </span>
                <input
                  type="tel"
                  id={formdata.placeholder}
                  name={formdata.placeholder}
                  placeholder={formdata.placeholder}
                  pattern="\d*"
                  value={formData[formdata.placeholder] || ""}
                  onChange={handleChange}
                  className={`p-2 flex-1 outline-none rounded-r-md ${
                    errors[formdata.placeholder] ? "border-red-500" : ""
                  }`}
                  aria-required="true"
                />
              </div>
            ) : (
              <input
                type="text"
                id={formdata.placeholder}
                name={formdata.placeholder}
                placeholder={formdata.placeholder}
                value={formData[formdata.placeholder] || ""}
                onChange={handleChange}
                className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[formdata.placeholder] ? "border-red-500" : ""
                }`}
                aria-required="true"
              />
            )}
            {errors[formdata.placeholder] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[formdata.placeholder]}
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Check Eligibility
        </button>
      </form>
      {eligibleMessage && (
        <div
          className="text-4xl text-center py-2 text-gray-600 font-bold eligibility-message"
          aria-live="polite"
        >
          {eligibleMessage}
        </div>
      )}
    </div>
  );
};

export default VisaEligibleForm;