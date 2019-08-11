import * as chai from "chai";
import { LotteryDraw, LotteryState } from "../../src/Lottery/LotteryDraw";

chai.should();

describe("LotteryDraw", () => {
  describe("#canOpen", () => {
    it("should return false if past end date", () => {
      const draw = new LotteryDraw();
      let now = new Date();

      now.setDate(now.getDate() - 10);
      draw.startDate = now.getTime();

      now.setDate(now.getDate() + 1);
      draw.endDate = now.getTime();

      draw.canOpen().should.be.false;
    });

    it("should return false if start date is in future", () => {
      const draw = new LotteryDraw();
      let now = new Date();

      now.setDate(now.getDate() + 10);
      draw.startDate = now.getTime();

      now.setDate(now.getDate() + 10);
      draw.endDate = now.getTime();

      draw.canOpen().should.be.false;
    });

    it("should return true if between start and end", () => {
      const draw = new LotteryDraw();
      let now = new Date();

      now.setDate(now.getDate() - 5);
      draw.startDate = now.getTime();

      now.setDate(now.getDate() + 10);
      draw.endDate = now.getTime();
      draw.status = LotteryState.PENDING;

      draw.canOpen().should.be.true;
    });

    it("should return false if dates are undefined", () => {
      const draw = new LotteryDraw();
      draw.canOpen().should.be.false;
    });
  });
});
