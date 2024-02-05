import jwt from "jsonwebtoken";

export const verifyToken = (token, secret) => {
  try {

    if(!token) throw new Error('Token vacío')
    const session = jwt.verify(token, secret);
    return session
  } catch (error) {
    return error;
  }
};
