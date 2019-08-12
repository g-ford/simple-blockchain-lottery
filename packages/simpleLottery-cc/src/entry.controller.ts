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
  public async getByDrawNumber(@Param(yup.string()) drawNumber: string) {
    // this might be a candidate for direct CouchDB access in a real world scenario
    const all = await LotteryEntry.getAll();
    console.log("All", all);
    const filtered = all.filter(x => x.drawNumber == drawNumber);
    console.log("Filtered", filtered);
    return all;
  }

  @Invokable()
  public async create(@Param(LotteryEntry) entry: LotteryEntry) {
    const draw = await LotteryDraw.getOne(entry.drawNumber);

    if (draw.status != LotteryState.OPEN) {
      throw Error("Cannot create Entry for a Draw that is not OPEN");
    }

    const existing = await LotteryEntry.getOne(entry.id);

    if (existing && existing.id) {
      throw Error("A entry with that ID already exists");
    }

    if (!entry.isValid) {
      throw Error("Not a valid entry");
    }

    await entry.save();
    return entry;
  }
}
