export const visaEligibleHeading = {
    title: "Check Your Eligibility",
    subTitle: "How can I check my eligibility for PR Visa 2025?",
  };
  
  const age = () => {
    const ageOptions = [];
    for (let i = 18; i <= 65; i++) {
      ageOptions.push({ value: i, label: `${i}` });
    }
    return ageOptions;
  };
  
  const years = () => {
    const yearOptions = [];
    for (let i = 0; i <= 10; i++) {
      yearOptions.push({ value: i, label: `${i} ${i > 0 ? "years" : "No Experience"}` });
    }
    return yearOptions;
  };
  
  export const visaFormData = [
    {
      placeholder: "FullName",
      label: "Full Name",
    },
    {
      placeholder: "Email",
      label: "Email",
    },
    {
      placeholder: "Country",
      label: "Country",
      options: [
        { value: "+91", label: "India 🇮🇳", flag: "🇮🇳" },
        { value: "+1", label: "USA 🇺🇸", flag: "🇺🇸" },
        { value: "+44", label: "UK 🇬🇧", flag: "🇬🇧" },
        { value: "+61", label: "Australia 🇦🇺", flag: "🇦🇺" },
        { value: "+49", label: "Germany 🇩🇪", flag: "🇩🇪" },
      ],
    },
    {
      placeholder: "Enter Your Mobile Number",
      label: "Mobile Number",
      countryCode: "+91", 
    },
    {
      placeholder: "Age",
      label: "Age",
      options: age(),
    },
    {
      placeholder: "Education",
      label: "Education",
      options: [
        { value: "PHD/DOCTORATE", label: "PhD/Doctorate" },
        { value: "Master", label: "Master's Degree" },
        { value: "Post Graduation", label: "Post Graduation" },
        { value: "Diploma", label: "Diploma" },
        { value: "Graduation", label: "Graduation" },
      ],
    },
    {
      placeholder: "Experience In Years",
      label: "Experience (Years)",
      options: years(),
    },
    {
      placeholder: "Visa Type",
      label: "Visa Type",
      options: [
        { value: "Permanent Residency Visa", label: "Permanent Residency Visa" },
        { value: "Work Permit Visa", label: "Work Permit Visa" },
      ],
    },
    {
      placeholder: "Migrate To",
      label: "Migrate To",
      options: [
        { value: "Canada", label: "Canada" },
        { value: "Australia", label: "Australia" },
        { value: "New Zealand", label: "New Zealand" },
        { value: "Singapore", label: "Singapore" },
        { value: "Germany", label: "Germany" },
        { value: "HongKong", label: "Hong Kong" },
        { value: "Denmark", label: "Denmark" },
      ],
    },
  ];