import { COLLECTION_NAME, getCollectionObj } from "../database/mongodb.js";
import jwt from "jsonwebtoken";
// const userAccount = {
//   "name": "Prelisa",
//   "email": "dPrelisa@gmail.com",
//   "password": "123",
//   "description": "dwqw",
//   "country": "wqr",
// };
export async function createAccount(mongo, req) {
  try {
    const { name, email, password, description } = req.body;
    const newUserObject = {
      name,
      email,
      password,
      description,
      joinedData: new Date().getTime(),
      _id: email,
    };
    console.log("Adding a new user", newUserObject);
    const collection = await getCollectionObj(COLLECTION_NAME.USER_COLLECTION, mongo);

    await collection.insertOne(newUserObject);
    const jwtToken = jwt.sign(
      {
        iat: new Date().getTime(),
        exp: new Date().getTime() + 60 * 60,
        name,
        email,
      },
      "prelisaSecretCode"
    );

    console.table(newUserObject);
    console.log("Successfully added a new user");
    return { newUserObject, jwtToken };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
