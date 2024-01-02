//TODO
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

const mocks = {
  Track: () => ({
    id: () => "Track 01",
    title: () => "Astro Kitty,Space Explorer",
    author: () => {
      return {
        name: "Grumpy Cat",
        photo:
          "https://images.unsplash.com/photo-1579168765467-3b235f938439?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      };
    },
    thumbnail: () =>
      "https://images.unsplash.com/photo-1608032364895-0da67af36cd2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    length: () => 1210,
    moduleCount: () => 6,
  }),
};

async function startApolloServer() {
  const server = new ApolloServer({
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs }),
      mocks,
    }),
  });
  const { url } = await startStandaloneServer(server);

  console.log(`🚀 Server is running 
📦 Query at ${url}`);
}

startApolloServer();
