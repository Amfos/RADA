// import "jest";
const sum = require("./sum");

describe("Sum test", () => {
  test("adds 1 + 2 to equal 3", async () => {
    expect(sum(1, 2)).toBe(3);
  });
});
