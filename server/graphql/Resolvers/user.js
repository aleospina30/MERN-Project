import Project from "../../models/Project.js";
import User from "../../models/User.js";

const user = async (_, { filter = {} }) => {
  try {
    const query = { isRemove: false };

    const { _id, docIdentity } = filter;
    if (_id) query._id = _id;
    if (docIdentity) query.docIdentity = docIdentity;

    // cambiar esta consulta a un aggregate y incluir el lookup para incluir un array de projects
    return await User.find(query);
  } catch (error) {
    return error;
  }
};

const user_create = async (_, { input }) => {
  try {
    const { name, username, docIdentity, email, password } = input;
    const user = new User({
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

const user_update = async (_, { input = {} }) => {
  try {
    const { _id, name, lastname, username, docIdentity, email, password } = input;
    
    const update = {
      $set: {
        name,
        lastname,
        username,
        docIdentity,
        email,
        password
      }
    };

    const updateUser = await User.findByIdAndUpdate(_id, update, {
      new: true,
    });
    return updateUser;
  } catch (error) {
    return error;
  }
};

const user_save = async (_, {input = {}}) => {
  try {
    if(input._id) {
      return await user_update(_, { input })
    } else {
      return await user_create(_, { input })
    }
  } catch(e) {
    return e
  }
}

const user_delete = async (_, { _id }) => {
  try {
    const deletedAt = new Date().getTime();
    const deleteUpdate = {
      isRemove: true,
      deletedAt,
    }
    const deletedUser = await User.findOneAndUpdate({_id, isRemove: false}, deleteUpdate);
    if (!deletedUser) throw new Error("User not found");

    await Project.updateMany({ isRemove: false, userId: _id }, deleteUpdate);
    return true;
  } catch (error) {
    return error;
  }
};

const login = async (_, {input}) => {
  try {
    const {email, password} = input;
    if(!email || email.trim() === '') throw new Error('Email is required')
    if(!password || password.trim() === '') throw new Error('Password is required')
    
    const LoginFind = await User.findOne({email, password}).lean()
    if(!LoginFind) throw new Error("Email o contraseña incorrecta")

    return LoginFind
  } catch (error) {
    return error
  }
}

const projectType = async (parent) => await Project.find({ userId: parent._id, 
  isRemove: false });

export const userResolvers = {
  Query: {
    user,
    login,
  },

  Mutation: {
    user_save,
    user_delete,
  },
  User: {
    projects: projectType
  }
};
