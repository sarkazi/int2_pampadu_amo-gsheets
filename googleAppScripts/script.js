function doPost(e) {
  try {
    var requestData = JSON.parse(e.postData.contents);

    var sheet = SpreadsheetApp.openById(
      "1B3RX023tnyWHC2sC5cIbGxS58nMz4hZRz2yp2Zgvi_w"
    ).getActiveSheet();

    var lastColumn = sheet.getLastColumn();

    if (!lastColumn) {
      var newHeaders = Object.keys(requestData);
      sheet.appendRow(newHeaders);
    }

    var dataValues = [];
    for (var value in requestData) {
      dataValues.push(requestData[value]);
    }

    sheet.appendRow(dataValues);

    var response = {
      test: lastColumn,
      test2: dataValues,
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
