const moment = require("moment");

/**
 * Format dates for the front end.
 * @param {Object} data
 * @returns {Object} - The data object with formatted date fields.
 */
const formatDateFields = (data) => {
  // Fields that should not be treated as dates.
  const excludedFields = ["Title", "Description"];

  //console.log(data.data)

  for (let key in data) {
    const value = data[key];
    for (let innerKey in value) {
      // Skip formatting for fields that should not be treated as dates
      if (excludedFields.includes(innerKey)) {
        continue;
      }

      const innerValue = value[innerKey];
      //console.log(innerValue)

      //console.log("outside IF", value[innerKey])

      // If innerValue is a valid ISO 8601 date, format it
      if (moment(innerValue, moment.ISO_8601, true).isValid()) {
        //console.log('B4', value[innerKey])
        value[innerKey] = moment(innerValue).format("DD/MM/YYYY"); // Reformat to DD/MM/YYYY
        //console.log('AFTA', value[innerKey])
      }
    }
  }

  return data;
};

module.exports = formatDateFields;
