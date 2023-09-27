("use strict");
const recordService = require("../services/record");
const httpCodes = require("../helpers/httpCodes.json");
const httpMessages = require("../helpers/httpMessages.json");
const asyncHandler = require("../error-handler/async");

// add new record into the database
exports.addRecord = asyncHandler(async (req, res) => {
  const { fromEmail, toEmail, latLng, DueDate } = req.body;

  // check the mandatory fields for registration
  if (!fromEmail || !toEmail || !latLng || !latLng.length || !DueDate)
    return res.json({
      code: httpCodes.NOT_FOUND,
      message: httpMessages.MISSING_FIELDS,
    });

    // function called to save the new record in the database
  const result = await recordService.addRecord(req.body);

  return result
    ? res.json({ code: httpCodes.OK, result })
    : res.json({
        code: httpCodes.NOT_FOUND,
        message: httpMessages.SOMETHING_WRONG,
      });
});


// function to get all records from database
exports.allRecords = asyncHandler(async (req, res) => {
  const result = await recordService.allRecords();

  return res.json({ code: httpCodes.OK, result });
});
