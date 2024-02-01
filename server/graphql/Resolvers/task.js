import { projectModel, taskModel} from './../../models/index.js'
import { v4 as uuidv4 } from "uuid";


const task = async (_, { filter = {} }) => {
  try {
    const { _id, status } = filter
    const query = {isRemove: false};
    if (_id) query._id = _id;
    if (status) query.status = status;

    const aggregate = taskModel.aggregate()
    .match(query)
    .lookup({
      from: 'projects',
      localField: 'projectId',
      foreignField: '_id',
      as: 'project'
    })
    .unwind('project')
    return await aggregate;

  } catch (error) {
    return error;
  }
};

const Task_create = async (_, { input }) => {
  try {
    const { title,description, projectId } = input;
    const projectFound = await projectModel.findOne({ _id:projectId });
    if (!projectFound) throw new Error("Project not found");
    const task = new taskModel({
      title,
      description,
      projectId,
    });
    return await task.save();
  } catch (error) {
    return error;
  }
};

const Task_update = async (_, { input }) => {
  try {
    const { _id, title, description, status } = input;
    if (!_id) throw new Error("Id is required");
    const update = {
      $set: {
        status,
        title,
        description,
      },
    };
    return await taskModel.findOneAndUpdate({ _id }, update, {
      new: true,
    });
  } catch (error) {
    return error;
  }
};

const Task_save = async (_, { input = {} }) => {
  try {
    const option = input._id ? "update" : "create";
    const options = {
      create: Task_create,
      update: Task_update,
    };
    return await options[option](_, { input });
  } catch (error) {
    return error;
  }
};

const Task_delete = async (_, { _id }) => {
  try {
    await taskModel.findOneAndUpdate(
      { _id },
      {
        isRemove: true,
        deletedAt: new Date().getTime()
      }
    );
    return true;
  } catch (error) {
    return error;
  }
};

const Task_comment = async (_, {taskId,body}) =>{
  try {
    const comment = {
      _id: uuidv4(),
      body,
    }
    const update = {
      $push: {comments: comment}
    }
    await taskModel.findOneAndUpdate({_id: taskId}, update)
    return comment
  } catch (error) {
    return error
  }
}


export const taskResolvers = {
  Query: {
    task,
  },
  Mutation: {
    Task_save,
    Task_delete,
    Task_comment,
  },
  Task: {
  },
};
