'use strict';

let _          = require('lodash'),
    fs         = require('fs'),
    Promise    = require('bluebird'),
    lineReader = require('line-reader');

let eachLine = Promise.promisify(lineReader.eachLine);
let i                  = 1,
    invoiceNumbers     = [],
    createArrays       = (n) => _.times(n, () => []),
    invoiceAsciiDigits = createArrays(9);

let digits = {
  ' _ | ||_|': '0',
  '     |  |': '1',
  ' _  _||_ ': '2',
  ' _  _| _|': '3',
  '   |_|  |': '4',
  ' _ |_  _|': '5',
  ' _ |_ |_|': '6',
  ' _   |  |': '7',
  ' _ |_||_|': '8',
  ' _ |_| _|': '9'
};

let identifyAsciiDigit = (digitString) => {

  // Return the digit that this string maps to.
  //
  // User Story 2: In case the digit string isn't recognized,
  // fallback to the '?' character.
  return digits[digitString] || '?';
}

let processAsciiArtLine = (line) => {

  // Ignore every 4th line
  if (i % 4 != 0) {
    _.each(line, (char, i) => {
      let digitIndex = Math.floor(i / 3);
      invoiceAsciiDigits[digitIndex].push(char);
    });
    console.log(line);
  } else {
    let invoiceNumber = _.reduce(invoiceAsciiDigits, (invoiceNumber, asciiDigit) => {
      let digit = identifyAsciiDigit(asciiDigit.join(''));
      return invoiceNumber + digit;
    }, '');

    if (_.includes(invoiceNumber, '?')) invoiceNumber += ' ILLEGAL';

    invoiceNumbers.push(invoiceNumber);
    console.log(invoiceNumber);
    invoiceAsciiDigits = createArrays(9);
  }
  i++;
};

let writeOutputFile = () => {
  fs.writeFileSync('./files/output_user_story_1_gur.txt', invoiceNumbers.join('\n') + '\n');
};

eachLine('./files/input_user_story_1.txt', processAsciiArtLine)
  .then(writeOutputFile).catch((err) => {
  console.error(err);
});


