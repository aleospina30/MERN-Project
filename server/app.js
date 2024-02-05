import { config } from "dotenv";
config()
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from 'cors'
import http from 'http'
import { verifyToken } from "./middlewares/verify.js";
import { Today } from "./Tools/functions.js";


export async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(cors())
  const httpServer = http.createServer(app)
  app.get('/', (req,res) => res.send('Welcome to my API'))

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server, {
    context: async ({ req }) => {
      try {
      const token = req.headers.token
      // console.log(token);
      const session = verifyToken(token, process.env.SECRET_KEY_LOGIN)
      if(session?.message) throw new Error('Token vencido')
       return {session}
      } catch (error) {
        return error;
      }
    },
  }));

  await new Promise(resolve => httpServer.listen({
    port: process.env.PORT
  }, resolve))
  console.log(` Server ready at https://localhost:4000`);
}
