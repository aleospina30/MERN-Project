import Project from "../../models/Project.js";
import Task from "../../models/Task.js";
import User from "../../models/User.js";

const project = async (_, { _id }) => {
  try {
    const query = {isRemove: false};
    if (_id) query._id = _id;
    return await Project.find(query);
  } catch (error) {
    return error;
  }
};

const project_create = async (_, { input }) => {
  try {
    const { name, description, userId } = input;
    const project = new Project({
      userId,
      name,
      description,
    });
    return await project.save();
  } catch (error) {
    return error;
  }
};

const project_delete = async (_, { _id }) => {
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
    return error;
  }
};

const project_update = async (_, { input }) => {
  try {
    const { _id, name, description } = input;
    const update = {
      $set: {
        name,
        description,
      }
    };
    return await Project.findByIdAndUpdate(_id, update, {
      new: true,
    });
  } catch (error) {
    return error;
  }
};

const tasksType = async (parent) => await Task.find({ projectId: parent._id });
const userType = async (parent) => await User.findOne({_id: parent.userId})

export const projectResolvers = {
  Query: {
    project,
  },

  Mutation: {
    project_create,
    project_delete,
    project_update,
  },
  Project: {
    tasks: tasksType,
    user: userType
  },
};
