import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Entry, EntryInput } from "../schema";
import { EntryService, DrawService } from "../services/fabricService";
import { v4 as uuid } from "uuid";

@Resolver(of => Entry)
export class EntryResolver {
  @Query(returns => [Entry], { nullable: true })
  public async getEntries(@Arg("drawNumber") drawNumber: string) {
    const raw = await EntryService.getByDrawNumber(drawNumber);
    const results = raw.map(x => new Entry(x));
    console.log(results);
    return results;
  }

  @Mutation(returns => Entry)
  public async createEntry(@Arg("entry") entry: EntryInput) {
    const entryWithId = entry as Entry;
    entryWithId.id = uuid() as string;
    console.log(entryWithId);
    const result = await EntryService.create(entryWithId);

    console.log(result);

    return new Entry(result);
  }
}
