/*
This Code use for app script
*/

function doGet() {}
function doPost(e) {
  
  // Get the Spreadsheet ID and the sheet name
  var sheet = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID").getSheetByName("Sheet1");
  
  // Get current date
  var date = new Date();
  
  // Get the data from postRequest
  var json = JSON.parse(e.postData.contents);
  
  // Insert data into Spreadsheet
  sheet.appendRow([date, json.subject, json.name, json.email, json.message]);
  
  // After get data then use it for function sendMail
  var response = sendMail({
    name: json.name,
    email: json.email,
    subject: json.subject,
    message: json.message
  });
  
  return ContentService.createTextOutput(JSON.stringify(response))
  .setMimeType(ContentService.MimeType.JSON)
  
}

// Create function sendMail
function sendMail(data) {
  try{
    // Fetch the data then pasts to each variable in email.html
    var html = HtmlService.createTemplateFromFile('email');
    html.name = data.name;
    html.email = data.email;
    html.subject = data.subject;
    html.message = data.message;
    
    // Send the content in email.html to YOUR_EMAIL
    MailApp.sendEmail('YOUR_EMAIL', 'SubJect', '', {
      name: 'From Name',
      replyTo: data.email,
      htmlBody: html.evaluate().getContent()
    });
  
  return {
    msg: 'Thank for contact us!' // Return message to your html form if something OK
  }
  }catch(err){
    return{
      msg: 'Something went wrong! Please try again.'
    };
  }
}