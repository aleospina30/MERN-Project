import Task from "../../models/Task.js";
import Project from "../../models/Project.js";

const task = async (_, { _id }) => {
  try {
    const query = {};
    if (_id) query._id = _id;
    return await Task.find(query);
  } catch (error) {
    return error;
  }
};

const task_create = async (_, { input }) => {
  try {
    const { title, projectId } = input;
    const projectFound = await Project.findById(projectId);
    if (!projectFound) throw new Error("Project not found");
    const task = new Task({
      title,
      projectId,
    });
    return await task.save();
  } catch (error) {
    return error;
  }
};

const task_delete = async (_, { _id }) => {
  try {
    const deletedAt = new Date().getTime();
    const deletedTask = await Task.findByIdAndUpdate(_id, {
      isRemove: true,
      deletedAt,
    });
    return true;
  } catch (error) {
    return error;
  }
};

const task_update = async (_, { input }) => {
  try {
    const { _id, title, comment } = input;
    if (!_id) throw new Error("Id is required");
    const update = {
      $set: {
        title,
      }
    };
    if (comment) update.$push = { comments: comment };
    return await Task.findByIdAndUpdate(_id, update, {
      new: true,
    });
  } catch (error) {
    return error;
  }
};

const projectType = async (parent) => await Project.findById(parent.projectId);

export const taskResolvers = {
  Query: {
    task,
  },
  Mutation: {
    task_create,
    task_delete,
    task_update,
  },
  Task: {
    project: projectType,
  },
};
