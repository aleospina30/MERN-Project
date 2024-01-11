import express from 'express';
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from "@apollo/server";

export async function startApolloServer(){
    const app = express()

const server = new ApolloServer({
    typeDefs: '',
    resolvers: () => {}
})

await server.start()

app.use('/graphql', expressMiddleware(server))
}