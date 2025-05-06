import express from "express";
import { connectMongoDB } from "./services/database/mongodb.js";
import { createAccount } from "./services/authentication/createAccount.js";
import { login } from "./services/authentication/login.js";
import cors from "cors";
import { createPost } from "./services/posts/createPost.js";
import { getAllPostForUser } from "./services/posts/getPosts.js";

const MONGO_URI = "mongodb+srv://prajeet:prajeet123@mind-bridge.pp4s1ju.mongodb.net/";
var app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("all good!");
});
app.post("/createAccount", async (req, res) => {
  try {
    let mongoDBServer = await connectMongoDB(MONGO_URI);
    const createAccountResponse = await createAccount(mongoDBServer, req);
    res.status(200).send({
      status: true,
      result: createAccountResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.toString() });
  }
});
app.post("/login", async (req, res) => {
  try {
    let mongoDBServer = await connectMongoDB(MONGO_URI);
    const user = await login(mongoDBServer, req);
    res.status(200).send({
      status: true,
      result: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.toString() });
  }
});
app.post("/createPost", async (req, res) => {
  try {
    let mongoDBServer = await connectMongoDB(MONGO_URI);
    const result = await createPost(mongoDBServer, req);
    res.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.toString() });
  }
});
app.get("/getAllPosts/:authorEmail", async (req, res) => {
  try {
    let mongoDBServer = await connectMongoDB(MONGO_URI);
    const result = await getAllPostForUser(mongoDBServer, req);
    res.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.toString() });
  }
});

app.listen(8080, () => {
  console.log("Server starting at 8080 testing");
});
