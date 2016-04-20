var AsciiUtils = require('./../ascii-utils');

describe("ASCII Utils", function() {

  it("should identify a number, given its flattened ASCII string", function() {
    expect(AsciiUtils.identifyFlattenedDigit(' _ | ||_|')).toBe('0');
  });

  it("should map an unrecognized flattened ASCII digit string to a '?' symbol", function() {
    expect(AsciiUtils.identifyFlattenedDigit(' _   ||_|')).toBe('?');
  });

  it("should return a number represented by the flattened ASCII digits input array", function() {
    var arr = [
      '     |  |'.split(''),
      ' _  _||_ '.split('')
    ];
    expect(AsciiUtils.flattenedDigitsToNumber(arr)).toBe('12');
  });
});
