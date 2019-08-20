import { ObjectType, Field, InputType } from "type-graphql";
import { LotteryResult } from "simplelottery-cc";

@ObjectType()
export class Result extends LotteryResult {
  @Field()
  id: string;

  @Field()
  drawNumber: string;

  @Field(type => [Number])
  numbers: number[];

  @Field(type => Date)
  public set date(value: Date) {
    this.drawDate = value.getTime();
  }

  public get date() {
    return new Date(this.drawDate);
  }

  public constructor(fields?: {
    id?: string;
    numbers?: number;
    drawDate?: number | Date;
    drawNumber?: string;
  }) {
    super();
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
