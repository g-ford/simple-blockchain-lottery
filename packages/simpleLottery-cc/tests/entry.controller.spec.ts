// tslint:disable:no-unused-expression
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
  DrawController
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

    await drawContoller.create("draw1", "2019-01-01", "2999-01-01");
  });

  describe("#create", () => {
    it("throws if draw is not open", async () => {
      expect(
        entryContoller.create("draw1", "entry1", [1, 2, 3, 4, 5])
      ).to.be.rejectedWith(Error);
    });

    it("create a valid entry", async () => {
      await drawContoller.open("draw1");
      await entryContoller.create("draw1", "entry1", [1, 2, 3, 4, 5]);
    });
  });
});
