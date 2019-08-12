// tslint:disable:no-unused-expression
import { v4 as uuid } from "uuid";
import { join } from "path";
import * as chai from "chai";
import { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { MockControllerAdapter } from "@worldsibu/convector-adapter-mock";
import {
  ClientFactory,
  ConvectorControllerClient,
  ConvectorModel
} from "@worldsibu/convector-core";
import "mocha";

import {
  EntryController,
  LotteryDraw,
  LotteryState,
  DrawController,
  LotteryEntry
} from "../src/";

chai.use(chaiAsPromised);

describe("EntryController", () => {
  let adapter: MockControllerAdapter;
  let entryContoller: ConvectorControllerClient<EntryController>;
  let drawContoller: ConvectorControllerClient<DrawController>;
  let draw: LotteryDraw;

  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    entryContoller = ClientFactory(EntryController, adapter);
    drawContoller = ClientFactory(DrawController, adapter);

    await adapter.init([
      {
        version: "*",
        controller: "EntryController",
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
      const entry = new LotteryEntry();
      entry.id = uuid();
      entry.drawNumber = "draw1";
      entry.numbers = [1, 2, 3, 4, 5];
      expect(entryContoller.create(entry)).to.eventually.be.rejectedWith(Error);
    });

    it("create a valid entry", async () => {});
    // TODO: figure out how to mock controllers properly
    //   this.skip();
    //   await drawContoller.open("draw1");
    //   await entryContoller.create("draw1", "entry1", [1, 2, 3, 4, 5]);
    // });
  });
});
