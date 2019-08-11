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
      await simplelotteryCtrl.create(id, d.toISOString(), d.toISOString());

      const justSavedModel = await adapter.getById<LotteryDraw>(id);

      expect(justSavedModel.id).to.exist;
      expect(justSavedModel.status).to.equal(LotteryState.PENDING);
    });

    it("can take just days", async () => {
      const start = new Date("2019-01-01");
      const end = new Date();
      end.setDate(end.getDate() + 20);

      const id = uuid();

      await simplelotteryCtrl.create(
        id,
        start.toISOString().slice(0, 10),
        end.toISOString().slice(0, 10)
      );

      const justSavedModel = await adapter.getById<LotteryDraw>(id);

      expect(justSavedModel.id).to.exist;
    });
  });

  describe("#openDraw", () => {
    it("sets state to OPEN", async () => {
      const start = new Date("2019-01-01");
      const end = new Date();
      end.setDate(end.getDate() + 20);

      const id = uuid();

      await simplelotteryCtrl.create(
        id,
        start.toISOString().slice(0, 10),
        end.toISOString().slice(0, 10)
      );
      await simplelotteryCtrl.open(id);

      const justSavedModel = await adapter.getById<LotteryDraw>(id);

      expect(justSavedModel.status).to.equal(LotteryState.OPEN);
    });

    it("throws on invalid draw", async () => {
      expect(simplelotteryCtrl.open(uuid())).to.be.rejectedWith(Error);
    });
  });
});
