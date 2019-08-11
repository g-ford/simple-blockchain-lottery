import * as yup from "yup";
import { LotteryDraw } from "./LotteryDraw";
import {
  ConvectorModel,
  Required,
  Validate,
  ReadOnly
} from "@worldsibu/convector-core";

const MAX_NUMBER = 20;
const MIN_NUMBER = 1;
const ENTRY_LENGTH = 5;

export class LotteryEntry extends ConvectorModel<LotteryEntry> {
  @ReadOnly()
  public readonly type = "au.com.tabcorp.simple.lotteryEntry";

  @Required()
  public test: string;

  @Required()
  // @Validate(
  //   yup
  //     .array()
  //     .of(yup.number())
  //     .min(MIN_NUMBER)
  //     .max(MAX_NUMBER)
  // )
  public numbers: Array<number>;

  public draw: LotteryDraw;

  public isValid(): boolean {
    const unique = [...new Set(this.numbers)];

    if (unique.length !== ENTRY_LENGTH) {
      return false;
    }

    if (
      Math.max(...this.numbers) > MAX_NUMBER ||
      Math.min(...this.numbers) < MIN_NUMBER
    ) {
      return false;
    }

    return true;
  }
}
