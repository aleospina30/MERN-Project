import Project from "../../models/Project.js";
import Task from "../../models/Task.js";


const project = async (_, { _id }) => {
  try {
    const query = {isRemove: false};
    if (_id) query._id = _id;
    const aggregate = Project.aggregate()
    .match(query)
    .lookup({
      from: 'tasks',
      localField: '_id',
      foreignField: 'projectId',
      as: 'tasks'
    })
    .lookup({
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user'
    })
    .unwind('user')
    return await aggregate
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
const project_update = async (_, { input }) => {
  try {
    const { _id, name, description } = input;
    const update = {
      $set: {
        name,
        description,
      }
    };
    return await Project.findOneAndUpdate({_id}, update, {
      new: true,
    });
  } catch (error) {
    return error;
  }
};

const project_save = async(_, {input = {} }) => {
  try {
    const option = input._id ? 'update' : 'create';
    const options = {
      create: project_create,
      update: project_update
    }
    return await options[option](_, { input });
  } catch (error) {
    return error
  }
}

const project_delete = async (_, { _id }) => {
  try {
    const deletedAt = new Date().getTime();
    const deletedProject = await Project.findOneAndUpdate({_id}, {
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

export const projectResolvers = {
  Query: {
    project,
  },

  Mutation: {
    project_save,
    project_delete,
  },
  Project: {
  },
};
