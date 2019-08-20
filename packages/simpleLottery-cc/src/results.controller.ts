import * as yup from "yup";
import { ChaincodeTx } from "@worldsibu/convector-platform-fabric";
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from "@worldsibu/convector-core";
import {
  LotteryDraw,
  LotteryState,
  LotteryEntry,
  LotteryResult
} from "./Lottery";

@Controller("results")
export class ResultsController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async getByDrawNumber(@Param(yup.string()) drawNumber: string) {
    const all = await LotteryResult.getAll();
    // this should throw is there is not a result
    // TODO: how to limit to a single result if there are more than one
    const filtered = all.filter(x => x.drawNumber == drawNumber)[0];
    return filtered;
  }

  @Invokable()
  public async create(@Param(LotteryResult) result2: LotteryResult) {
    const result = new LotteryResult(result2);
    console.log(result);
    console.log("Getting draw", result.drawNumber);
    const draw = await LotteryDraw.getOne(result.drawNumber);

    console.log("Checking id", draw.id);
    if (!draw || !draw.id) {
      throw Error(`No draw exists for draw number ${result.drawNumber}`);
    }

    console.log("Checking status", draw.status);
    if (draw.status != LotteryState.CLOSED) {
      throw Error("Cannot create Results for a Draw that is not CLOSED");
    }

    console.log("Checking existing");
    const existing = await LotteryResult.getOne(result.id);

    if (!!existing && existing.id) {
      throw Error("A result with that ID already exists");
    }

    console.log("Checking validity");
    if (!result.isValid()) {
      throw Error("Not a valid entry");
    }

    console.log("All good saving");
    await result.save();
    console.log("Updating draw status");
    draw.status = LotteryState.DRAWN;
    await draw.save();

    return result;
  }
}
