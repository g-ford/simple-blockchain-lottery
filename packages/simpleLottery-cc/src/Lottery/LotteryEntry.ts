import { ConvectorModel, Required, ReadOnly } from "@worldsibu/convector-core";

const MAX_NUMBER = 20;
const MIN_NUMBER = 1;
const ENTRY_LENGTH = 5;

export class LotteryEntry extends ConvectorModel<LotteryEntry> {
  @ReadOnly()
  public type = "au.com.tabcorp.simple.lotteryEntry";

  @Required()
  public id: string;

  @Required()
  public numbers: number[];

  @Required()
  public drawNumber: string;

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
