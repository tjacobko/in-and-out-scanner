// checks if inputValue exists within list of IDs
function exists(inputValue, sheet) {
  var lastRow = sheet.getLastRow()  // position of the last row with content

  if (lastRow === 2) return null

  var range = sheet.getRange(3, 1, lastRow-2)
  var numRows = range.getNumRows()

  for (var row = 1; row <= numRows; row++) {
    var cell = sheet.getRange(row+2, 1)
    var cellValue = cell.getValue()

    var out = sheet.getRange(row+2, 3)

    if (cellValue === inputValue && out.isBlank()) {
      return cell
    }
  }
  
  return null
}

// takes input from A1, check if it exists in list ? out : enter ID + in
function onEdit(e) {
  var sheet = e.source.getActiveSheet()
  var range = e.range  // range is the range of cells that were edited
  var inputCell = "A1" // Change this to the cell where you want to input data
  var inputValue = range.getValue()

  Logger.log(range.getA1Notation())

  if (range.getA1Notation() === inputCell && inputValue !== "Scan Here") {            // checking if the correct cell was edited
    const date = new Date()
    const formatted = date.toLocaleString()

    var idExists = exists(inputValue, sheet)
    if (idExists) {
      var row = idExists.getRow()
      var col = idExists.getColumn()
      var targetCol = col + 2
      sheet.getRange(row, targetCol).setValue(formatted)
    }
    else {
      var lastRow = sheet.getLastRow()                     // gets the last row with values
      sheet.getRange(lastRow + 1, 1).setValue(inputValue)  // inputs value to the last row in A1

      sheet.getRange(lastRow + 1, 2).setValue(formatted)  // inputs value to IN column
    }

    range.setValue("Scan Here")
  }
}
