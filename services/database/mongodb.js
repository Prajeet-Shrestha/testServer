import { MongoClient } from "mongodb";

export const COLLECTION_NAME = {
  USER_COLLECTION: "users",
  POST_COLLECTION: "posts",
};

export async function connectMongoDB(uri) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri);
    console.log("Connecting to MongoDB Atlas cluster...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");
    const db = mongoClient.db("school");

    return db;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

export async function getCollectionObj(collectionName, mongoClientDB) {
  console.log(`Fetching ${collectionName} collection`);
  console.log(mongoClientDB);
  if (Object.values(COLLECTION_NAME).includes(collectionName)) {
    return await mongoClientDB.collection(collectionName);
  } else {
    console.warn(`${collectionName} doesnot exist yet. Please define it at COLLECTION_NAME`);
  }
}
