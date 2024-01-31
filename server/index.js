import { startApolloServer } from './app.js';
import { connectDB } from './db.js';
import {resolvers, typeDefs}  from './graphql/index.js';
connectDB()
startApolloServer(typeDefs, resolvers);
