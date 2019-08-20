// tslint:disable:no-unused-expression
import { v4 as uuid } from "uuid";
import { join } from "path";
import { MockControllerAdapter } from "@worldsibu/convector-adapter-mock";
import {
  ClientFactory,
  ConvectorControllerClient,
  ConvectorModel
} from "@worldsibu/convector-core";
import "jest";

import {
  ResultsController,
  LotteryDraw,
  LotteryState,
  DrawController,
  LotteryResult
} from "../src";

describe("ResultsController", () => {
  let adapter: MockControllerAdapter;
  let resultsController: ConvectorControllerClient<ResultsController>;
  let drawContoller: ConvectorControllerClient<DrawController>;
  let draw: LotteryDraw;

  beforeAll(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    resultsController = ClientFactory(ResultsController, adapter);
    drawContoller = ClientFactory(DrawController, adapter);

    await adapter.init([
      {
        version: "*",
        controller: "ResultsController",
        name: join(__dirname, "..")
      },
      {
        version: "*",
        controller: "DrawController",
        name: join(__dirname, "..")
      }
    ]);

    const draw = new LotteryDraw();
    draw.id = "draw1";
    draw.startDate = new Date("2019-01-01").getTime();
    draw.endDate = new Date("2999-01-01").getTime();
    await drawContoller.create(draw);
  });

  describe("#create", () => {
    it("throws if draw is not open", async () => {
      const result = new LotteryResult();
      result.id = uuid();
      result.drawNumber = "draw1";
      result.numbers = [1, 2, 3, 4, 5];
      result.drawDate = Date.now();
      await expect(resultsController.create(result)).rejects.toThrow(Error);
    });

    // it("create a valid entry", async () => {
    //   await drawContoller.open("draw1");

    //   const result = new LotteryResult();
    //   result.id = uuid();
    //   result.drawNumber = "draw1";
    //   result.numbers = [1, 2, 3, 4, 5];
    //   result.drawDate = Date.now();
    //   console.log(result);

    //   const r = await resultsController.create(result);
    //   console.log(r);

    //   expect(r).not.toBe(null);
    // });
  });
});
