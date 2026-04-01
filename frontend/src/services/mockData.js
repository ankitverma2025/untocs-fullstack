// Waitlist form submission service - sends data to Google Sheets

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwB8tuPJF331sHmN-eOVbkHOBpz2HlsUewEnZ0aWnHDR8pEZ3QRDWthiWPkqRBM5B6CLQ/exec';

export const submitWaitlistForm = async (formData) => {
  try {
    // Map form data to match Google Sheets columns exactly
    const submissionData = {
      firstName: formData.firstName,
      email: formData.email,
      phone: formData.phone || '',
      babyAge: formData.babyAge,
      location: formData.location,
      chemicalConcern: formData.chemicalConcern === 'very-concerned' ? 'Very concerned' : 
                       formData.chemicalConcern === 'somewhat-concerned' ? 'Somewhat concerned' : 
                       formData.chemicalConcern === 'not-thought' ? 'Not thought about it until now' : formData.chemicalConcern,
      firstImpression: formData.firstImpression || '',
      openToConversation: formData.openToConversation === 'yes' ? 'Yes, I\'m happy to talk' : 
                          formData.openToConversation === 'skip' ? 'Skip for now' : formData.openToConversation
    };

    console.log('Sending to Google Sheets:', submissionData);

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    });
    
    // Note: With no-cors mode, we can't read the response
    // But the submission will work if the script is set up correctly
    console.log('Waitlist submission sent to Google Sheets:', submissionData);
    
    return {
      success: true,
      message: "You're on the list!",
      data: formData
    };
    
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw new Error('Failed to submit. Please try again.');
  }
};

export const getWaitlistSubmissions = () => {
  // This is no longer needed as data is in Google Sheets
  return [];
};
