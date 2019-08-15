import { ObjectType, Field, InputType } from "type-graphql";
import { Draw } from "./Draw";
import { LotteryEntry } from "simplelottery-cc";
import { extractExtensionDefinitions } from "graphql-tools";

@ObjectType()
export class Entry extends LotteryEntry {
  @Field()
  id: string;

  @Field()
  drawNumber: string;

  @Field(type => [Number])
  numbers: number[];

  public constructor(fields?: { drawNumber?: string; numbers?: number[] }) {
    super();
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

@InputType()
export class EntryInput implements Partial<Entry> {
  @Field()
  drawNumber!: string;

  @Field(type => [Number])
  numbers!: number[];
}
