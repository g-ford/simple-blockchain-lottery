// tslint:disable:no-unused-expression
import uuid from "uuid/v4";
import { join } from "path";
import * as chai from "chai";
import { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { MockControllerAdapter } from "@worldsibu/convector-adapter-mock";
import {
  ClientFactory,
  ConvectorControllerClient
} from "@worldsibu/convector-core";
import "mocha";

import { DrawController } from "../src/draw.controller";
import { LotteryDraw, LotteryState } from "../src/Lottery";

chai.use(chaiAsPromised);

describe("DrawController", () => {
  let adapter: MockControllerAdapter;
  let simplelotteryCtrl: ConvectorControllerClient<DrawController>;

  before(async () => {
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

      expect(justSavedModel.id).to.exist;
      expect(justSavedModel.status).to.equal(LotteryState.PENDING);
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

      expect(justSavedModel.status).to.equal(LotteryState.OPEN);
    });

    // it("throws on invalid draw", async () => {
    //   expect(simplelotteryCtrl.open(uuid())).to.be.rejectedWith(Error);
    // });
  });
});
