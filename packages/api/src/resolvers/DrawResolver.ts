import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root
} from "type-graphql";
import { Draw, DrawInput } from "../schema";
import { DrawService, ResultsService } from "../services/fabricService";
import { LotteryDraw, LotteryResult, LotteryState } from "simplelottery-cc";
import { v4 as uuid } from "uuid";
import { Result } from "../schema/Result";

@Resolver(of => Draw)
export class DrawResolver {
  @Query(returns => Draw, { nullable: true })
  public async getDraw(@Arg("id") id: string) {
    const raw: LotteryDraw = await DrawService.get(id);
    return new Draw(raw);
  }

  @Query(returns => [Draw])
  public async allDraws() {
    const raw: [LotteryDraw] = await DrawService.getAll();
    return raw.map(x => new Draw(x));
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
  public async nextStatus(
    @Arg("drawNumber") drawNumber: string,
    @Arg("currentStatus") currentStatus: string
  ) {
    let raw: any;
    switch (currentStatus) {
      case "PENDING":
        raw = await DrawService.open(drawNumber);
        break;
      case "OPEN":
        raw = await DrawService.close(drawNumber);
        break;
      case "CLOSED":
        raw = await ResultsService.create(generateResults(drawNumber));
        break;
      default:
        throw Error("Invalid current state");
    }

    return new Draw(raw);
  }

  @FieldResolver()
  public async results(@Root() draw: Draw) {
    if (
      draw.status === LotteryState.DRAWN ||
      draw.status === LotteryState.PAYING
    ) {
      const raw = await ResultsService.getByDrawNumber(draw.id);
      const results = new Result(raw);
      return results;
    }
  }
}

const generateResults = (drawNumber: string) => {
  const result = new LotteryResult();
  result.id = uuid();
  result.drawNumber = drawNumber;
  result.numbers = new Array(5).fill(0).map(() => randomNumberInRange(1, 20));
  result.drawDate = Date.now();
  return result;
};

const randomNumberInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
