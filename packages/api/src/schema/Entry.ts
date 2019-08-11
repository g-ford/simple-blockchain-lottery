import { ObjectType, Field } from "type-graphql";
import { Draw } from "./Draw";

@ObjectType()
export class Entry {
  @Field(type => Draw)
  draw: Draw;

  @Field(type => [Number])
  numbers: number[];
}
