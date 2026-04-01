// Updated Google Apps Script for untocs Waitlist Form
// Paste this in Extensions > Apps Script in your Google Sheet

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add data to sheet with all new fields
    sheet.appendRow([
      new Date(),                      // Timestamp
      data.firstName,                  // First Name
      data.email,                      // Email
      data.phone || '',                // Phone Number (optional)
      data.babyAge,                    // Baby's Age
      data.location,                   // City
      data.chemicalConcern,            // Chemical Concern Level
      data.firstImpression || '',      // First Impression (optional)
      data.openToConversation          // Open to Conversation
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Submission received!' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
