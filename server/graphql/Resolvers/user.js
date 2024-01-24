import User from "../../models/User.js"


const user = async (_, { filter }) => {
    try {
    const { _id, docIdentity } = filter
    const query = {isRemove: false};
    if(_id) query._id = _id;
    if(docIdentity) query.docIdentity = docIdentity
    const usersFound = await User.find(query);
    if(!usersFound.length)throw new Error('NO ENCONTRÉ UNA MONDA')
    return usersFound
    } catch (error) {
        return error
    }
};

const userCreate = async(_, { input }) => {
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
        return error
    }
};

export const userResolvers = {
    Query: {
        user
    },

    Mutation: {
        userCreate
    }
}


