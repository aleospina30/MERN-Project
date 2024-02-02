import jwt from "jsonwebtoken";
import { projectModel, userModel } from "./../../models/index.js";

const user = async (_, { filter = {} }, {session}) => {
  try {
    const query = { isRemove: false };
    console.log({session});
    const { _id, docIdentity } = filter;
    if (_id) query._id = _id;
    if (docIdentity) query.docIdentity = docIdentity;

    const user = userModel.aggregate().match(query).lookup({
      from: "projects",
      localField: "_id",
      foreignField: "userId",
      as: "projects",
    });

    return await user;
  } catch (error) {
    return error;
  }
};

const User_create = async (_, { input }) => {
  try {
    const { name, username, docIdentity, email, password } = input;
    if (!email || email.trim() === "") throw new Error("Email is required");
    if (!password || password.trim() === "")
      throw new Error("Password is required");
    const user = new userModel({
      name,
      username,
      docIdentity,
      email,
      password,
    });
    return await user.save();
  } catch (error) {
    return error;
  }
};

const User_update = async (_, { input = {} }, {session}) => {
  try {
    const {_id} = session
    const {  name, lastname, username, docIdentity, email, password } =
      input;

    const update = {
      $set: {
        name,
        lastname,
        username,
        docIdentity,
        email,
        password,
      },
    };

    return await userModel.findByIdAndUpdate(_id, update, {
      new: true,
    });
  } catch (error) {
    return error;
  }
};

const User_save = async (_, { input = {} }) => {
  try {
    const option = input._id ? "update" : "create";
    const options = {
      create: User_create,
      update: User_update,
    };
    return await options[option](_, { input });
  } catch (e) {
    return e;
  }
};

const User_delete = async (_, { _id }) => {
  try {
    const deleteUpdate = {
      isRemove: true,
      deletedAt: new Date().getTime(),
    };
    const deletedUser = await userModel.updateOne(
      { _id, isRemove: false },
      deleteUpdate
    );
    await projectModel.updateMany(
      { isRemove: false, userId: _id },
      deleteUpdate
    );
    return !!deletedUser?.modifiedCount;
  } catch (error) {
    return error;
  }
};

const login = async (_, { input }) => {
  try {
    const { email, password } = input;
    if (!email || email.trim() === "") throw new Error("Email is required");
    if (!password || password.trim() === "")
      throw new Error("Password is required");

    const LoginFind = await userModel.findOne({ email, password }).lean();
    if (!LoginFind) throw new Error("Email o contraseña incorrecta");
    const sessionToken = jwt.sign(LoginFind, process.env.SECRET_KEY_LOGIN, {
      expiresIn: "1d",
    });
    console.log("EL TOKEN ES: ", sessionToken);
    return sessionToken;
  } catch (error) {
    return error;
  }
};

export const userResolvers = {
  Query: {
    user,
    login,
  },

  Mutation: {
    User_save,
    User_delete,
  },
  User: {},
};
