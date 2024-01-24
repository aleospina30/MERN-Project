import { projectResolvers } from "./Resolvers/project.js";
import { taskResolvers } from "./Resolvers/task.js";
import { projectTypeDefs } from "./Schemas/project.js";
import { taskTypeDefs } from "./Schemas/task.js";

export const resolvers = [taskResolvers, projectResolvers]
export const typeDefs = [taskTypeDefs, projectTypeDefs]