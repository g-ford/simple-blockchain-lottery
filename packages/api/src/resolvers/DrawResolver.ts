import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Draw, DrawInput } from "../schema";
import { DrawService, initAdapter } from "../services/fabricService";
import { LotteryDraw } from "simplelottery-cc";
import { log } from "../config";
import { throws } from "assert";

@Resolver(of => Draw)
export class DrawResolver {
  @Query(returns => Draw, { nullable: true })
  public async getDraw(@Arg("drawNumber") drawNumber: string) {
    const raw = await DrawService.get(drawNumber);

    return this.reformat(raw);
  }

  @Mutation(returns => Draw)
  public async updateDraw(@Arg("draw") draw: DrawInput) {
    const raw = await DrawService.create(
      draw.drawNumber,
      draw.startDate.toISOString(),
      draw.endDate.toISOString()
    );
    return this.reformat(raw);
  }

  @Mutation(returns => Draw, {
    description: "Progresses the Draw through the workflow"
  })
  public async nextStatus(@Arg("drawNumber") drawNumber: string) {
    const raw = await DrawService.open(drawNumber);

    return this.reformat(raw);
  }

  private reformat(raw) {
    const draw = new LotteryDraw(raw);

    console.debug(raw);
    console.log(draw);
    console.log(draw.status);

    const result = new Draw({
      drawNumber: draw.id,
      startDate: new Date(draw.startDate),
      endDate: new Date(draw.endDate),
      status: draw.status
    });
    return result;
  }
}
