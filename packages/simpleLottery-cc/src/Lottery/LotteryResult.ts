import * as yup from "yup";
import {
  ConvectorModel,
  Required,
  ReadOnly,
  Validate
} from "@worldsibu/convector-core";

const MAX_NUMBER = 20;
const MIN_NUMBER = 1;
const ENTRY_LENGTH = 5;

export class LotteryResult extends ConvectorModel<LotteryResult> {
  @ReadOnly()
  public readonly type = "com.example.simple.lotteryResult";

  @Required()
  @Validate(yup.string())
  public id: string;

  @Required()
  @Validate(yup.array().of(yup.number()))
  public numbers: number[];

  @Required()
  @Validate(yup.string())
  public drawNumber: string;

  @Required()
  @Validate(yup.number())
  public drawDate: number;

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
