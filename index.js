import express from "express";
import cors from "cors";
import multer from "multer";

const upload = multer();

const app = express();
app.use(cors());
app.use(express.json());
app.use(upload.array());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (username && avatar) {
    users.push({ username, avatar });
    res.status(200).send("OK");
  } else {
    res.status(400).send("Invalid Input");
  }
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  if (username && tweet) {
    tweets.push({ username, tweet });
    res.status(200).send("OK");
  } else {
    res.status(400).send("Bad request");
  }
});

app.get("/tweets", (_req, res) => {
  res.send(tweets.slice(-10));
});

app.listen(5000, () => console.log("Listening on 5000"));
