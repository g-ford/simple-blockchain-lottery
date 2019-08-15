import * as yup from "yup";
import { ChaincodeTx } from "@worldsibu/convector-platform-fabric";
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from "@worldsibu/convector-core";
import { LotteryDraw, LotteryState } from "./Lottery";
import { DateRegex, stringDate } from "./utils";

@Controller("draw")
export class DrawController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async get(@Param(yup.string()) drawNumber: string) {
    let draw = await LotteryDraw.getOne(drawNumber);
    return draw;
  }

  @Invokable()
  public async getAll() {
    let draw = await LotteryDraw.getAll();
    return draw;
  }

  @Invokable()
  public async create(@Param(LotteryDraw) draw: LotteryDraw) {
    draw.status = LotteryState.PENDING;
    await draw.save();
    return draw;
  }

  @Invokable()
  public async open(@Param(yup.string()) drawNumber: string) {
    let draw = await LotteryDraw.getOne(drawNumber);

    if (!draw.id) {
      throw Error(`No draw exists for draw number ${drawNumber}`);
    }

    if (!draw.canOpen()) {
      throw Error("Draw cannot be opened at this time");
    }

    draw.status = LotteryState.OPEN;
    await draw.save();
    return draw;
  }

  @Invokable()
  public async close(@Param(yup.string()) drawNumber: string) {
    let draw = await LotteryDraw.getOne(drawNumber);

    if (!draw.id) {
      throw Error(`No draw exists for draw number ${drawNumber}`);
    }

    if (!draw.canClose()) {
      throw Error("Draw cannot be closed at this time");
    }

    draw.status = LotteryState.CLOSED;
    await draw.save();
    return draw;
  }
}
