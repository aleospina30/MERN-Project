import { projectResolvers } from "./Resolvers/project.js";
import { taskResolvers } from "./Resolvers/task.js";
import { userResolvers } from "./Resolvers/user.js";
import { projectTypeDefs } from "./Schemas/project.js";
import { taskTypeDefs } from "./Schemas/task.js";
import { userTypeDefs } from "./Schemas/user.js";



export const resolvers = [taskResolvers, projectResolvers,userResolvers]
export const typeDefs = [taskTypeDefs, projectTypeDefs, userTypeDefs]