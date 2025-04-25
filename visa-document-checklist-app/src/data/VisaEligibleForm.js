export const visaEligibleForm = [
    {
      placeholder: 'Full Name',
      name: 'FullName',
    },
    {
      placeholder: 'Email',
      name: 'Email',
    },
    {
      placeholder: 'Country',
      name: 'Country',
      options: [
        { value: 'usa', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'canada', label: 'Canada' },
        { value: 'australia', label: 'Australia' },
        { value: 'schengen', label: 'Schengen Area' },
        { value: 'japan', label: 'Japan' },
        { value: 'india', label: 'India' },
        { value: 'germany', label: 'Germany' },
        { value: 'turkey', label: 'Turkey' },
        { value: 'france', label: 'France' },
        { value: 'china', label: 'China' },
        { value: 'brazil', label: 'Brazil' },
        { value: 'south_africa', label: 'South Africa' },
        { value: 'new_zealand', label: 'New Zealand' },
        { value: 'russia', label: 'Russia' },
        { value: 'thailand', label: 'Thailand' },
        { value: 'mexico', label: 'Mexico' },
        { value: 'south_korea', label: 'South Korea' },
        { value: 'uae', label: 'United Arab Emirates' },
      ],
    },
    {
      placeholder: 'Select Visa Type',
      name: 'VisaType',
      options: [
        { value: 'student', label: 'Student Visa' },
        { value: 'tourist', label: 'Tourist Visa' },
        { value: 'work', label: 'Work Visa' },
      ],
    },
];