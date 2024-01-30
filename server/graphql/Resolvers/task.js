import Task from "../../models/Task.js";
import Project from "../../models/Project.js";

const task = async (_, { filter = {} }) => {
  try {
    const { _id, status } = filter
    const query = {isRemove: false};
    if (_id) query._id = _id;
    if (status) query.status = status;
    const aggregate = Task.aggregate()
    .match(query)
    .lookup({
      from: 'projects',
      localField: '_id',
      foreignField: 'projectId'
    })
    return await aggregate;
  } catch (error) {
    return error;
  }
};

const task_create = async (_, { input }) => {
  try {
    const { title,description, projectId } = input;
    const projectFound = await Project.findOne({ _id:projectId });
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
    const { _id, title, description, status, comment } = input;
    if (!_id) throw new Error("Id is required");
    const update = {
      $set: {
        status,
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


export const taskResolvers = {
  Query: {
    task,
  },
  Mutation: {
    task_save,
    task_delete,
  },
  Task: {
  },
};
