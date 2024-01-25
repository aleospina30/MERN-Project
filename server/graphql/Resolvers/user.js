import User from "../../models/User.js";

const user = async (_, { filter = {} }) => {
  try {
    const { _id, docIdentity } = filter;
    const query = { isRemove: false };
    if (_id) query._id = _id;
    if (docIdentity) query.docIdentity = docIdentity;
    const usersFound = await User.find(query);
    if (!usersFound.length) throw new Error("NO ENCONTRÉ UNA MONDA");
    return usersFound;
  } catch (error) {
    return error;
  }
};

const userCreate = async (_, { input }) => {
  try {
    const { name, username, docIdentity, email, password } = input;
    const user = new User({
      name,
      username,
      docIdentity,
      email,
      password,
    });
    const userSaved = await user.save();
    return userSaved;
  } catch (error) {
    return error;
  }
};

const userUpdate = async (_, { input }) => {
  try {
    const { _id, name, username, docIdentity, email, password } = input;
    const update = {};
    if (name) update.name = name;
    if (username) update.username = username;
    if (docIdentity) update.docIdentity = docIdentity;
    if (email) update.email = email;
    if (password) update.password = password;
    const updateUser = await User.findByIdAndUpdate(_id, update, {
      new: true,
    });
    if (!updateUser) throw new Error("User not found");
    return updateUser;
  } catch (error) {
    return error;
  }
};

const userDelete = async (_, { _id }) => {
  try {
    const deletedAt = new Date().getTime();
    const deleteUser = await User.findByIdAndUpdate(_id, {
      isRemove: true,
      deletedAt,
    });
    if (!deleteUser) throw new Error("User not found");
    return true;
  } catch (error) {
    return error;
  }
};

export const userResolvers = {
  Query: {
    user,
  },

  Mutation: {
    userCreate,
    userUpdate,
    userDelete,
  },
};
