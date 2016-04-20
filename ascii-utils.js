'use strict';

let _ = require('lodash');


//
// Define a collection of flattened ASCII art digits.
// "Flattened" means that a the seven-block digit's characters
// are concatenated from left to right, row by row.  For example, number 2:
//  _
//  _|
// |_     ==    ' _  _||_ '
//
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

let identifyFlattenedDigit = (str) => {

  // Return the digit that this string maps to.
  //
  // User Story 2: In case the digit string isn't recognized,
  // fallback to the '?' character.
  return digits[str] || '?';
};

let flattenedDigitsToNumber = (asciiDigitsArray) => {
  return _.reduce(asciiDigitsArray, (str, asciiDigit) => {
    let digit = identifyFlattenedDigit(asciiDigit.join(''));
    return str + digit;
  }, '');
};


module.exports = {
  identifyFlattenedDigit,
  flattenedDigitsToNumber
};