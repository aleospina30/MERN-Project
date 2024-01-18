import Project from "../models/Project.js";
import Task from "../models/Task.js";

//Funciones Query
const projects = async () => await Project.find();
const project = async (_, { _id }) => await Project.findById(_id);
const tasks = async () => await Task.find();
const task = async (_, { _id }) => await Task.findById(_id);

//Funciones Mutation
const createProject = async (_, { name, description }) => {
  const project = new Project({
    name,
    description,
  });
  const savedProject = await project.save();
  return savedProject;
};

const deleteProject = async (_, { _id }) => {
  const deletedProject = await Project.findByIdAndDelete(_id);
  if (!deletedProject) throw new Error("Project not found");

  Task.deleteMany({ projectId: deletedProject._id });

  return true;
};

const updateProject = async (_, { _id, name, description }) => {
  try {
    const update = {};
    if (name) update.name = name;
    if (description) update.description = description;
    const updatedProject = await Project.findByIdAndUpdate(_id, update, {
      new: true,
    });
    if (!updatedProject) throw new Error("Project not found");
    return updatedProject;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createTask = async (_, { title, projectId }) => {
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

const updateTask = async (_, { _id, title, projectId }) => {
  try {
    const update = {};
    if (name) update.title = title;
    if (projectId) update.projectId = projectId;
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

//Funciones Project
const projectType = async (parent) => await Project.findById(parent.projectId);

//Funciones Task
const tasksType = async (parent) => await Task.find({ projectId: parent._id });

export const resolvers = {
  //Consultas
  Query: {
    projects,
    project,
    tasks,
    task,
  },
  //Cambios en la BD
  Mutation: {
    createProject,
    deleteProject,
    updateProject,
    createTask,
    deleteTask,
    updateTask,
  },
  Task: {
    project: projectType,
  },
  Project: {
    tasks: tasksType,
  },
};
