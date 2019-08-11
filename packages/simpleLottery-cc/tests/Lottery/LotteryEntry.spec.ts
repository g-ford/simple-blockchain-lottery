import * as chai from "chai";
import { LotteryEntry } from "../../src/Lottery/LotteryEntry";

chai.should();

describe("LotteryEntry", () => {
  describe("#isValid", () => {
    it("should return false if too many numbers", () => {
      const entry = new LotteryEntry();
      entry.numbers = [1, 2, 3, 4, 5, 6];
      entry.isValid().should.be.false;
    });

    it("should return false if not enough numbers", () => {
      const entry = new LotteryEntry();
      entry.numbers = [1, 2, 3, 4];
      entry.isValid().should.be.false;
    });

    it("should return true if the right amount of numbers", () => {
      const entry = new LotteryEntry();
      entry.numbers = [1, 2, 3, 4, 5];
      entry.isValid().should.be.true;
    });

    it("should return false if any number is too low", () => {
      const entry = new LotteryEntry();
      entry.numbers = [0, 2, 3, 4, 5];
      entry.isValid().should.be.false;
    });

    it("should return false if any number is too high", () => {
      const entry = new LotteryEntry();
      entry.numbers = [100, 2, 3, 4, 5];
      entry.isValid().should.be.false;
    });

    it("should return true if any number is on the boundary", () => {
      const entry = new LotteryEntry();
      entry.numbers = [1, 2, 3, 4, 20];
      entry.isValid().should.be.true;
    });

    it("should return false if any number is duplicated", () => {
      const entry = new LotteryEntry();
      entry.numbers = [1, 1, 3, 4, 20];
      entry.isValid().should.be.false;
    });
  });
});
