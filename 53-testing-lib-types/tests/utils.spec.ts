import { countChars } from "../js/utils";

describe("countChars spec", () => {
  it("should return number of chars of input word", () => {
    const word = "patata";
    const expectedChars = 6;

    expect(countChars(word)).toBe(expectedChars);
  });
});
