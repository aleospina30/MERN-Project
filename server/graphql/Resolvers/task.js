import Task from "../../models/Task.js";
import Project from "../../models/Project.js";

const task = async (_, { _id }) => {
  try {
  const query = {};
  if (_id) query._id = _id;
  else {throw new Error('No encuentro una monda')}
  return await Task.find(query);
  } catch (error){
    return error
  }
};

const taskCreate = async (_, { input }) => {
try {
  const { title, projectId } = input;
  const projectFound = await Project.findById(projectId);
  if (!projectFound) throw new Error("Project not found");

  const task = new Task({
    title,
    projectId,
  });
  const taskSaved = await task.save();
  return taskSaved;
} catch (error) {
  return error
}
};

const taskDelete = async (_, { _id }) => {
  try {
  const deletedAt = new Date().getTime();
  const deletedTask = await Task.findByIdAndUpdate(_id, {
    isRemove: true,
    deletedAt,
  });
  if (!deletedTask) throw new Error("Task not found");
  return true;
  } catch (error) {
    return error
  }
};

const taskUpdate = async (_, { input }) => {
  try {
    const { _id, title, projectId, comment } = input;
    if(!_id)throw new Error("Id is required")
    const update = {};
    if (title) update.title = title;
    if (projectId) update.projectId = projectId;
    if(comment) update.$push = {comments: comment}
    const updatedTask = await Task.findByIdAndUpdate(_id, update, {
      new: true,
    });
    if (!updatedTask) throw new Error("Task not found");
    return updatedTask;
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
    taskCreate,
    taskDelete,
    taskUpdate,
  },
  Task: {
    project: projectType,
  },
};
