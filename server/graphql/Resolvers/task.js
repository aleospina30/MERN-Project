import Task from "../../models/Task.js";
import Project from "../../models/Project.js";

const task = async (_, { _id }) => {
  try {
  const query = {};
  if (_id) query._id = _id;
  else {throw new Error('No encuentro una monda')}
  return await Task.find(query);
  } catch (error){
    console.error(error)
  }
};

const createTask = async (_, { input }) => {
  const { title, projectId } = input;
  const projectFound = await Project.findById(projectId);
  if (!projectFound) throw new Error("Project not found");

  const task = new Task({
    title,
    projectId,
  });
  const taskSaved = await task.save();
  return taskSaved;
};

const deleteTask = async (_, { _id }) => {
  const deletedTask = await Task.findByIdAndDelete(_id);
  if (!deletedTask) throw new Error("Task not found");
  return true;
};

const updateTask = async (_, { input }) => {
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
    console.error(error);
    return error;
  }
};

const projectType = async (parent) => await Project.findById(parent.projectId);

export const taskResolvers = {
  Query: {
    task,
  },
  Mutation: {
    createTask,
    deleteTask,
    updateTask,
  },
  Task: {
    project: projectType,
  },
};
