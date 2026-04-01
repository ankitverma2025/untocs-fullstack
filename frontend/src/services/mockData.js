// Waitlist form submission service - sends data to Google Sheets

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwB8tuPJF331sHmN-eOVbkHOBpz2HlsUewEnZ0aWnHDR8pEZ3QRDWthiWPkqRBM5B6CLQ/exec';

export const submitWaitlistForm = async (formData) => {
  try {
    // Map form data to readable format for Google Sheets
    const submissionData = {
      ...formData,
      chemicalConcern: formData.chemicalConcern === 'very-concerned' ? 'Very concerned' : 
                       formData.chemicalConcern === 'somewhat-concerned' ? 'Somewhat concerned' : 
                       'Not thought about it until now',
      openToConversation: formData.openToConversation === 'yes' ? 'Yes, I\'m happy to talk' : 'Skip for now'
    };

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
