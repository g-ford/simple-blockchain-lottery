import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Draw, DrawInput } from "../schema";
import { DrawService, initAdapter } from "../services/fabricService";
import { LotteryDraw } from "simplelottery-cc";
import { log } from "../config";
import { throws } from "assert";

@Resolver(of => Draw)
export class DrawResolver {
  @Query(returns => Draw, { nullable: true })
  public async getDraw(@Arg("id") id: string) {
    const raw = await DrawService.get(id);
    return new Draw(raw);
  }

  @Mutation(returns => Draw)
  public async updateDraw(@Arg("draw") draw: DrawInput) {
    const bcDraw = new LotteryDraw();
    bcDraw.id = draw.id;
    bcDraw.startDate = draw.start.getTime();
    bcDraw.endDate = draw.end.getTime();

    const raw = await DrawService.create(bcDraw);

    return new Draw(raw);
  }

  @Mutation(returns => Draw, {
    description: "Progresses the Draw through the workflow"
  })
  public async nextStatus(@Arg("drawNumber") drawNumber: string) {
    const raw = await DrawService.open(drawNumber);
    return new Draw(raw);
  }
}
