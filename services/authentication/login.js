import { COLLECTION_NAME, getCollectionObj } from "../database/mongodb.js";
import jwt from "jsonwebtoken";

export async function login(mongo, req) {
  try {
    const { email, password } = req.body;
    console.log("Login user", { email, password });
    const collection = await getCollectionObj(COLLECTION_NAME.USER_COLLECTION, mongo);
    const response = await collection.findOne({ email, password });
    console.log(response);
    if (response) {
      const user = {
        name: response.name,
        email: response.email,
        description: response.description,
        country: response.country,
        iat: new Date().getTime(),
        exp: new Date().getTime() + 60 * 60 * 1000,
      };
      const jwtToken = jwt.sign(user, "prelisaSecretCode");
      console.log("Successfully logged in - user");
      return { user, jwtToken };
    } else {
      throw new Error("User not found.");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
