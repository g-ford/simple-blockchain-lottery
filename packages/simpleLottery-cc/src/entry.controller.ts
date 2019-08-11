import * as yup from "yup";
import { ChaincodeTx } from "@worldsibu/convector-platform-fabric";
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from "@worldsibu/convector-core";
import { LotteryDraw, LotteryState, LotteryEntry } from "./Lottery";
import { DateRegex } from "./utils";

@Controller("entry")
export class EntryController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(yup.string()) id: string,
    @Param(yup.string()) drawNumber: string,
    @Param(yup.array().of(yup.number())) numbers: number[]
  ) {
    const draw = await LotteryDraw.getOne(drawNumber);

    console.log(draw);

    if (draw.status != LotteryState.OPEN) {
      throw Error("Cannot create Entry for a Draw that is not OPEN");
    }

    const existing = await LotteryEntry.getOne(id);

    if (existing && existing.id) {
      throw Error("A entry with that ID already exists");
    }

    const entry = new LotteryEntry({
      draw: draw,
      numbers: numbers
    });

    if (!entry.isValid) {
      throw Error("Not a valid entry");
    }

    await entry.save();
    return entry;
  }
}
