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
    const projectFound = await Project.findOne({ projectId });
    if (!projectFound) throw new Error("Project not found");
    const task = new Task({
      title,
      description,
      projectId,
    });
    return await task.save();
  } catch (error) {
    return error;
  }
};

const task_update = async (_, { input }) => {
  try {
    const { _id, title, description, comment } = input;
    if (!_id) throw new Error("Id is required");
    const update = {
      $set: {
        title,
        description,
      },
    };
    if (comment) update.$push = { comments: comment };
    return await Task.findOneAndUpdate({ _id }, update, {
      new: true,
    });
  } catch (error) {
    return error;
  }
};

const task_save = async (_, { input = {} }) => {
  try {
    const option = input._id ? "update" : "create";
    const options = {
      create: task_create,
      update: task_update,
    };
    return await options[option](_, { input });
  } catch (error) {
    return error;
  }
};

const task_delete = async (_, { _id }) => {
  try {
    const deletedAt = new Date().getTime();
    await Task.findOneAndUpdate(
      { _id },
      {
        isRemove: true,
        deletedAt,
      }
    );
    return true;
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
    task_save,
    task_delete,
  },
  Task: {
    project: projectType,
  },
};
