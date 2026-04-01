// Mock service for waitlist form submission
// This simulates backend API calls for the frontend-only version

export const submitWaitlistForm = async (formData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Store in localStorage for demo purposes
  const existingSubmissions = JSON.parse(localStorage.getItem('waitlistSubmissions') || '[]');
  
  const submission = {
    id: Date.now(),
    ...formData,
    timestamp: new Date().toISOString()
  };
  
  existingSubmissions.push(submission);
  localStorage.setItem('waitlistSubmissions', JSON.stringify(existingSubmissions));
  
  console.log('Waitlist submission (mock):', submission);
  
  return {
    success: true,
    message: "You're on the list!",
    data: submission
  };
};

export const getWaitlistSubmissions = () => {
  return JSON.parse(localStorage.getItem('waitlistSubmissions') || '[]');
};
