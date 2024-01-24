import Project from "../../models/Project.js";
import Task from "../../models/Task.js";


const project = async (_, { _id }) => {
  try {
    const query = {};
  if (_id) query._id = _id;
  return await Project.find(query);
  } catch (error) {
    console.error(error);
    return error
  }
};

const createProject = async (_, { input }) => {
  const { name, description } = input;
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

const updateProject = async (_, { input }) => {
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
    console.log(error);
    return error;
  }
};

const tasksType = async (parent) => await Task.find({ projectId: parent._id });



export const projectResolvers = {
    Query: {
        project
    },

    Mutation: {
        createProject,
        deleteProject,
        updateProject
    },
    Project: {
        tasks: tasksType
    }
}