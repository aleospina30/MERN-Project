import { startApolloServer } from './app.js';
import { connectDB } from './db.js';
import {resolvers, typeDefs}  from './graphql/relation.js';
connectDB()
startApolloServer(typeDefs, resolvers);
