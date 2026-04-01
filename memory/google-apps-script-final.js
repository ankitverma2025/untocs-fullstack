// CORRECTED Google Apps Script for untocs Waitlist Form
// Replace your existing script with this code

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Log received data for debugging
    Logger.log('Received data: ' + JSON.stringify(data));
    
    // Add data to sheet - EXACT ORDER matching your columns
    sheet.appendRow([
      new Date(),                    // Column A: Timestamp
      data.firstName || '',          // Column B: First Name
      data.email || '',              // Column C: Email
      data.phone || '',              // Column D: Phone
      data.babyAge || '',            // Column E: Baby's Age
      data.location || '',           // Column F: City
      data.chemicalConcern || '',    // Column G: Chemical Concern
      data.firstImpression || '',    // Column H: First Impression
      data.openToConversation || ''  // Column I: Open to Conversation
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Submission received!',
        data: data 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - run this to verify the script works
function testScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        firstName: 'Test User',
        email: 'test@example.com',
        phone: '+919876543210',
        babyAge: '0-6',
        location: 'Mumbai',
        chemicalConcern: 'Very concerned',
        firstImpression: 'Looks amazing!',
        openToConversation: 'Yes, I\'m happy to talk'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log('Test result: ' + result.getContent());
}
