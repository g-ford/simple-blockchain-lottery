import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { DrawResolver } from "./resolvers/DrawResolver";
import { ApolloServer } from "apollo-server";
import { port } from "./config/env";
import { log } from "./config";
import { EntryResolver } from "./resolvers/EntryResolver";

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [DrawResolver, EntryResolver],
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
