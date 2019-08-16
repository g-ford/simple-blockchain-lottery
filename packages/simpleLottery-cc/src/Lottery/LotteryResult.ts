import { ConvectorModel, Required, ReadOnly } from "@worldsibu/convector-core";
import { LotteryEntry } from ".";

const MAX_NUMBER = 20;
const MIN_NUMBER = 1;
const ENTRY_LENGTH = 5;

export class LotteryResult extends LotteryEntry {
  @ReadOnly()
  public type = "au.com.tabcorp.simple.lotteryResult";

  @Required()
  public drawDate: number;
}
