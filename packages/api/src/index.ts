import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { DrawResolver } from "./resolvers/DrawResolver";
import { ApolloServer } from "apollo-server";
import { port } from "./config/env";
import { log } from "./config";

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [DrawResolver],
    emitSchemaFile: true
  });

  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true
  });

  server.listen(port).then(({ url }) => log.info(`Server ready at ${url}. `));
};

bootstrap();
