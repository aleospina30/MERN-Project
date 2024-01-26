import Project from "../../models/Project.js";
import Task from "../../models/Task.js";


const project = async (_, { _id }) => {
  try {
    const query = {};
  if (_id) query._id = _id;
  return await Project.find(query);
  } catch (error) {
    return error
  }
};

const projectCreate = async (_, { input }) => {
 try {
  const { name, description } = input;
  const project = new Project({
    name,
    description,
  });
  const savedProject = await project.save();
  return savedProject;
 } catch (error) {
  return error
 }
};

const projectDelete = async (_, { _id }) => {
  try {
    const deletedAt = new Date().getTime();
    const deletedProject = await Project.findByIdAndUpdate(_id, {
      isRemove: true,
      deletedAt,
    });
    if (!deletedProject) throw new Error("Project not found");
    Task.updateMany({ projectId: deletedProject._id });
    return true;
  } catch (error) {
    return error
  }
};

const projectUpdate = async (_, { input }) => {
  try {
    const { _id, name, description } = input;
    const update = {};
    if (name) update.name = name;
    if (description) update.description = description;
    const updatedProject = await Project.findByIdAndUpdate(_id, update, {
      new: true,
    });
    if (!updatedProject) throw new Error("Project not found");
    return updatedProject;
  } catch (error) {
    return error;
  }
};

const tasksType = async (parent) => await Task.find({ projectId: parent._id });



export const projectResolvers = {
    Query: {
        project
    },

    Mutation: {
        projectCreate,
        projectDelete,
        projectUpdate
    },
    Project: {
        tasks: tasksType
    }
}