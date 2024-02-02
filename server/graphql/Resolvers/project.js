import { projectModel, taskModel } from './../../models/index.js'


const project = async (_, { _id }) => {
  try {
    const query = {isRemove: false};
    if (_id) query._id = _id;
    const aggregate = projectModel.aggregate()
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

const Project_create = async (_, { input }) => {
  try {
    const { name, description, userId } = input;
    const project = new projectModel({
      userId,
      name,
      description,
    });
    return await project.save();
  } catch (error) {
    return error;
  }
};
const Project_update = async (_, { input }) => {
  try {
    const { _id, name, description } = input;
    const update = {
      $set: {
        name,
        description,
      }
    };
    return await projectModel.findOneAndUpdate({_id}, update, {
      new: true,
    });
  } catch (error) {
    return error;
  }
};

const Project_save = async(_, {input = {} }) => {
  try {
    const option = input._id ? 'update' : 'create';
    const options = {
      create: Project_create,
      update: Project_update
    }
    return await options[option](_, { input });
  } catch (error) {
    return error
  }
}

const Project_delete = async (_, { _id }) => {
  try {
    const deletedAt = new Date().getTime();
    const deletedProject = await projectModel.updateOne({_id}, {
      isRemove: true,
      deletedAt,
    });
    taskModel.updateMany({ projectId: deletedProject._id }, {
      $set: {isRemove: true} });
      return !!deletedProject?.modifiedCount;
  } catch (error) {
    return error;
  }
};

export const projectResolvers = {
  Query: {
    project,
  },

  Mutation: {
    Project_save,
    Project_delete,
  },
  Project: {
  },
};
