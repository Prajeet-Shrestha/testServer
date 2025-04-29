import { COLLECTION_NAME, getCollectionObj } from "../database/mongodb.js";

export async function getAllPostForUser(mongo, req) {
  try {
    const { authorEmail } = req.params;
    console.log(authorEmail);
    const collection = await getCollectionObj(COLLECTION_NAME.POST_COLLECTION, mongo);
    const response = await collection.find({ authorEmail }).toArray();
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
