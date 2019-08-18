// tslint:disable:no-unused-expression
import { v4 as uuid } from "uuid";
import { join } from "path";
import { MockControllerAdapter } from "@worldsibu/convector-adapter-mock";
import {
  ClientFactory,
  ConvectorControllerClient
} from "@worldsibu/convector-core";
import "jest";

import { DrawController, LotteryDraw, LotteryState } from "../src/";

describe("DrawController", () => {
  let adapter: MockControllerAdapter;
  let simplelotteryCtrl: ConvectorControllerClient<DrawController>;

  beforeAll(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    simplelotteryCtrl = ClientFactory(DrawController, adapter);

    await adapter.init([
      {
        version: "*",
        controller: "DrawController",
        name: join(__dirname, "..")
      }
    ]);
  });

  describe("#create", () => {
    it("create a Draw in Pending state", async () => {
      const d = new Date();
      const id = uuid();

      const draw = new LotteryDraw();
      draw.id = id;
      draw.startDate = d.getTime();
      draw.endDate = d.getTime();

      await simplelotteryCtrl.create(draw);

      const justSavedModel = await adapter.getById<LotteryDraw>(id);

      expect(justSavedModel.id).not.toBeNull();
      expect(justSavedModel.status).toBe(LotteryState.PENDING);
    });
  });

  describe("#openDraw", () => {
    it("sets state to OPEN", async () => {
      const start = new Date("2019-01-01");
      const end = new Date();
      end.setDate(end.getDate() + 20);

      const id = uuid();

      const draw = new LotteryDraw();
      draw.id = id;
      draw.startDate = start.getTime();
      draw.endDate = end.getTime();

      await simplelotteryCtrl.create(draw);
      await simplelotteryCtrl.open(id);

      const justSavedModel = await adapter.getById<LotteryDraw>(id);

      expect(justSavedModel.status).toBe(LotteryState.OPEN);
    });

    // it("throws on invalid draw", async () => {
    //   expect(simplelotteryCtrl.open(uuid())).to.be.rejectedWith(Error);
    // });
  });
});
