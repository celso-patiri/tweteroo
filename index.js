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
    res.status(201).send({ data, msg: "OK" });
  } else {
    res.status(400).send("Todos os campos são obrigatórios!");
  }
});

app.post("/tweets", (req, res) => {
  const data = req.body;
  const username = req.headers.username;

  if (username && data.tweet) {
    tweets.push({ username, tweet: data.tweet });
    res.status(201).send({ data, msg: "OK" });
  } else {
    res.status(400).send("Todos os campos são obrigatórios!");
  }
});

app.get("/tweets", (req, res) => {
  let page = req.query.page;
  page = page ? parseInt(page) : null;

  if (!page) res.send(tweets.slice(-10));
  else if (isNaN(page) || page < 1) {
    res.status(400).send("Informe uma página válida!");
  } else {
    res.send(tweets.slice((page - 1) * 10, page * 10));
  }
});

app.get("/tweets/:username", (req, res) => {
  res.send(tweets.filter((tweet) => tweet.username === req.params.username));
});

app.listen(5000, () => console.log("Listening on 5000"));
