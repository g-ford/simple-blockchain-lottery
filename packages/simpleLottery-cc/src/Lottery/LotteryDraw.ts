import * as yup from "yup";
import {
  ConvectorModel,
  ReadOnly,
  Required,
  Validate
} from "@worldsibu/convector-core";

export enum LotteryState {
  PENDING = "PENDING",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  DRAWN = "DRAWN",
  PAYING = "PAYING",
  COMPLETE = "COMPLETE"
}

export class LotteryDraw extends ConvectorModel<LotteryDraw> {
  @ReadOnly()
  @Required()
  public readonly type = "au.com.tabcorp.simple.lotteryDraw";

  @Required()
  @Validate(yup.string())
  public status: string;

  @Required()
  @Validate(yup.number())
  public startDate: number;

  @Required()
  @Validate(yup.number())
  public endDate: number;

  public canOpen(): boolean {
    const now = new Date().getTime();
    return (
      this.status === LotteryState.PENDING &&
      this.startDate <= now &&
      now <= this.endDate
    );
  }

  public canClose(): boolean {
    return this.status === LotteryState.OPEN;
  }
}
