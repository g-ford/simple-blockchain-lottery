import { ObjectType, Field, InputType } from "type-graphql";
import { LotteryDraw } from "simplelottery-cc";
import { Result } from "./Result";

@ObjectType({
  description:
    "A Draw is a single lottery instance, represented by Draw Number conducted on a certain date"
})
export class Draw extends LotteryDraw {
  @Field(type => String)
  id: string;

  @Field(type => Date)
  public set start(value: Date) {
    this.startDate = value.getTime();
  }

  public get start() {
    return new Date(this.startDate);
  }

  @Field(type => Date)
  public set end(value: Date) {
    this.endDate = value.getTime();
  }

  public get end() {
    return new Date(this.endDate);
  }

  @Field()
  readonly status: string;

  @Field(type => Result, { nullable: true })
  readonly results?: Result;

  public constructor(fields?: {
    id?: string;
    startDate?: number;
    endDate?: number;
    status?: string;
  }) {
    super();
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

@InputType({
  description: `For creating or updating draws. See Draw for more info.

  When updating a Draw you cannot directly set the \`status\``
})
export class DrawInput implements Partial<Draw> {
  @Field(type => String)
  id!: string;

  @Field(type => Date)
  start!: Date;

  @Field(type => Date)
  end!: Date;
}
