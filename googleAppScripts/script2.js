function doPost(e) {
  try {
    var requestData = JSON.parse(e.postData.contents);

    var sheet = SpreadsheetApp.openById(
      "1B3RX023tnyWHC2sC5cIbGxS58nMz4hZRz2yp2Zgvi_w"
    ).getSheetByName("Успешно");

    var lastColumn = sheet.getLastColumn();

    if (!lastColumn) {
      var newHeaders = Object.keys(requestData);
      sheet.appendRow(newHeaders);
    }

    const leadId = requestData.id_lead;

    var rowValues = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];

    const leadIdRowIndex = rowValues.indexOf("id_lead");

    const columnNumber = leadIdRowIndex + 1;

    const rowNumber = findRowByValue(sheet, columnNumber, leadId);

    if (!rowNumber) {
      var dataValues = [];
      for (var value in requestData) {
        dataValues.push(requestData[value]);
      }

      sheet.appendRow(dataValues);
    } else {
      const callAt = requestData.data_zvonka;

      // var cell = sheet.getRange(rowNumber, columnNumber);

      // cell.setValue(callAt);
    }

    var response = {
      rowNumber,
      columnNumber,
      message: "Данные успешно добавлены в таблицу.",
    };

    return ContentService.createTextOutput(
      JSON.stringify(response)
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      "Произошла ошибка: " + error.message
    );
  }
}

function findRowByValue(sheet, columnNumber, searchValue) {
  var range = sheet.getRange(2, columnNumber, sheet.getLastRow(), 1);
  var values = range.getValues();

  for (var i = 0; i < values.length; i++) {
    if (values[i][0] == searchValue) {
      return i + 2;
    }
  }

  return -1;
}
