import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const data = req.body;

  if (data.username && data.avatar) {
    users.push(data);
    res.status(200).send("OK");
  } else {
    res.status(400).send(`Bad request`);
  }
});
app.post("/tweets", (req, res) => {
  const data = req.body;

  if (data.username && data.tweet) {
    tweets.push(data);
    res.status(200).send("OK");
  } else {
    res.status(400).send("Bad request");
  }
});

app.get("/tweets", (_req, res) => {
  res.send(tweets.slice(-10));
});

app.listen(5000, () => console.log("Listening on 5000"));
