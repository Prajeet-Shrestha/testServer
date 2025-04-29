import { COLLECTION_NAME, getCollectionObj } from "../database/mongodb.js";
import jwt from "jsonwebtoken";
export async function createPost(mongo, req) {
  try {
    const { title, thumbnailUrl, subTitle, body, keywords, authorEmail, authorName, jwtToken } = req.body;
    const jwtTokendecoded = jwt.verify(jwtToken, "prelisaSecretCode");
    console.log({ title, thumbnailUrl, subTitle, body, keywords, authorEmail, authorName, jwtToken });
    console.log(jwtTokendecoded);
    console.log(jwtTokendecoded.name.toLowerCase(), authorName.toLowerCase(), jwtTokendecoded.email.toLowerCase(), authorEmail.toLowerCase());
    if (jwtTokendecoded.exp <= new Date().getTime()) {
      throw new Error("Session Expired");
    }
    if (jwtTokendecoded.name.toLowerCase() != authorName.toLowerCase() || jwtTokendecoded.email.toLowerCase() != authorEmail.toLowerCase()) {
      throw new Error("Authentication failed!");
    }

    const newPostObject = {
      title,
      thumbnailUrl,
      subTitle,
      body,
      keywords: keywords.split(","),
      authorEmail,
      authorName,
      createdTime: new Date().getTime(),
    };
    console.log("Adding a new user", newPostObject);
    const collection = await getCollectionObj(COLLECTION_NAME.POST_COLLECTION, mongo);
    await collection.insertOne(newPostObject);
    console.table(newPostObject);
    console.log("Successfully added a new user");
    return { newPostObject };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
