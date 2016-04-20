'use strict';

let _          = require('lodash'),
    fs         = require('fs'),
    Promise    = require('bluebird'),
    lineReader = require('line-reader'),
    AsciiUtils = require('./ascii-utils');

let eachLine = Promise.promisify(lineReader.eachLine);
let i              = 1,
    args           = process.argv.slice(2),
    inputFilePath  = args[0],
    outputFilePath = args[1],
    invoiceNumbers = [],
    createArrays   = (n) => _.times(n, () => []),

    // Each ASCII digit will have its characters accumulated to
    // the sub-array in the corresponding position.
    asciiDigits    = createArrays(9);


let processAsciiArtLine = (line) => {

  // On lines 1-3, 5-7, 9-11 etc. accumulate characters into their digit's sub-array
  if (i % 4 != 0) {
    _.each(line, (char, i) => {
      let digitIndex = Math.floor(i / 3);
      asciiDigits[digitIndex].push(char);
    });
  } else {

    //
    // On every 4th line, transform the collected ASCII digits
    // to an actual number and add it to the array of invoice numbers
    // that will eventually be written to the output file
    //
    let invoiceNumber = AsciiUtils.flattenedDigitsToNumber(asciiDigits);
    if (_.includes(invoiceNumber, '?')) invoiceNumber += ' ILLEGAL';    // User Story 2
    invoiceNumbers.push(invoiceNumber);

    // Reset array for next 3 lines
    asciiDigits = createArrays(9);
  }
  i++;
};


let writeOutputFile = () => {
  fs.writeFileSync(outputFilePath, invoiceNumbers.join('\n') + '\n');
};


//
// Read file, parse lines, write output
//
eachLine(inputFilePath, processAsciiArtLine)
  .then(writeOutputFile)
  .catch((err) => {
    console.log('Error occurred!!!');
    console.error(err);
  });


