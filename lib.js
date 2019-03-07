// TECHNOTE: All the variables and functions you declare in all files share the same global scope, so be careful you do not overwrite any of them accidentally.

// call directly func in this lib without any "importing" or "require/using"


/* Create the contentoutput of MimeType JSON */
function JsonizeOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}


/**
get all row of sheet (lookup by id), return as array of data
*/
function getActiveSheetAppData(id) {
  return SpreadsheetApp
      .openById(id)
      .getActiveSheet()
      .getDataRange()
      .getValues();
}

// convert array of data to array of record. use the last skipping row as heading.
// E.g.: skip = 1, use row 1 as heading (name, price, img). column name will be record.prop. We will have [{name, price, img}, {name, price, img}]
function convertSpreadsheetAppDataArrayToRecordsArray(data, skip){
  var arrRet = [];
  var columnsHeadings = {};
  
  // default, skip first row
  if(!skip || skip < 1){
    skip = 1;
  }
  
  for(var skipIndex = 0; skipIndex < skip; skipIndex++) {
    columnsHeadings = data.shift();
  }
  
  // console.log(columnsHeadings);  
  for(var rowIndex = 0; rowIndex < data.length; rowIndex++) {
    var row = data[rowIndex];
    var objData = {};
    for (var i = 0; i < columnsHeadings.length; i++) {
      var colName = columnsHeadings[i];
      objData[colName] = row[i];
    }
    arrRet.push(objData)
  }
  
  return arrRet;  
}


/**
 * Creates a Google Doc and sends an email to the current user with a link to the doc.
 */
function createAndSendDocument() {  
  var doc = DocumentApp.create('Hello, world!');   // Create a new Google Doc named 'Hello, world!'  
  doc.getBody().appendParagraph('This document was created by Google Apps Script.');  // Access the body of the document, then add a paragraph.
  
  var email = Session.getActiveUser().getEmail();   // // Get the email address of the active user - that's you.
  var subject = doc.getName();  // Get the name of the document to use as an email subject line.
  var url = doc.getUrl(); // Get the URL of the document.
  var body = 'Link to your doc: ' + url;

  // Send yourself an email with a link to the document.
  GmailApp.sendEmail(email, subject, body);
}


// TODO: prepend to the top
   // https://stackoverflow.com/questions/28295056/google-apps-script-appendrow-to-the-top     