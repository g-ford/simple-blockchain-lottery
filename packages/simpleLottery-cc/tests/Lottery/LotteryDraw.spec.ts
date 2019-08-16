import "jest";
import { LotteryDraw, LotteryState } from "../../src/Lottery/LotteryDraw";

describe("LotteryDraw", () => {
  describe("#canOpen", () => {
    it("should return false if past end date", () => {
      const draw = new LotteryDraw();
      let now = new Date();

      now.setDate(now.getDate() - 10);
      draw.startDate = now.getTime();

      now.setDate(now.getDate() + 1);
      draw.endDate = now.getTime();

      expect(draw.canOpen()).toBe(false);
    });

    it("should return false if start date is in future", () => {
      const draw = new LotteryDraw();
      let now = new Date();

      now.setDate(now.getDate() + 10);
      draw.startDate = now.getTime();

      now.setDate(now.getDate() + 10);
      draw.endDate = now.getTime();

      expect(draw.canOpen()).toBe(false);
    });

    it("should return true if between start and end", () => {
      const draw = new LotteryDraw();
      let now = new Date();

      now.setDate(now.getDate() - 5);
      draw.startDate = now.getTime();

      now.setDate(now.getDate() + 10);
      draw.endDate = now.getTime();
      draw.status = LotteryState.PENDING;

      expect(draw.canOpen()).toBe(true);
    });

    it("should return false if dates are undefined", () => {
      const draw = new LotteryDraw();
      expect(draw.canOpen()).toBe(false);
    });
  });
});
