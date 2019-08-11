import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType({
  description:
    "A Draw is a single lottery instance, represented by Draw Number conducted on a certain date"
})
export class Draw {
  @Field(type => String)
  drawNumber: string;

  @Field(type => Date)
  startDate: Date = new Date();

  @Field(type => Date)
  endDate: Date = new Date();

  @Field({
    description: "Use `nextStatus` to move the draw through the workflow"
  })
  status: string;

  public constructor(fields?: {
    drawNumber?: string;
    startDate?: Date;
    endDate?: Date;
    status?: string;
  }) {
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
  drawNumber!: string;

  @Field(type => Date)
  startDate!: Date;

  @Field(type => Date)
  endDate!: Date;
}
