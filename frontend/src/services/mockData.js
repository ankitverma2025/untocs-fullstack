// Waitlist form submission service - sends data to Google Sheets

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwB8tuPJF331sHmN-eOVbkHOBpz2HlsUewEnZ0aWnHDR8pEZ3QRDWthiWPkqRBM5B6CLQ/exec';

export const submitWaitlistForm = async (formData) => {
  try {
    // Map chemicalConcern to readable text
    let chemicalConcernText = '';
    if (formData.chemicalConcern === 'very-concerned') {
      chemicalConcernText = 'Very concerned';
    } else if (formData.chemicalConcern === 'somewhat-concerned') {
      chemicalConcernText = 'Somewhat concerned';
    } else if (formData.chemicalConcern === 'not-thought') {
      chemicalConcernText = 'Not thought about it until now';
    } else {
      chemicalConcernText = formData.chemicalConcern || '';
    }

    // Map openToConversation to readable text
    let openToConversationText = '';
    if (formData.openToConversation === 'yes') {
      openToConversationText = "Yes, I'm happy to talk";
    } else if (formData.openToConversation === 'skip') {
      openToConversationText = 'Skip for now';
    } else {
      openToConversationText = formData.openToConversation || '';
    }

    // Map form data to match Google Sheets columns exactly
    const submissionData = {
      firstName: formData.firstName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      babyAge: formData.babyAge || '',
      location: formData.location || '',
      chemicalConcern: chemicalConcernText,
      firstImpression: formData.firstImpression || '',
      openToConversation: openToConversationText
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
    
    console.log('Waitlist submission sent successfully');
    
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
