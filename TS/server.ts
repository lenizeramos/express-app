import express, { Response, Request, NextFunction } from "express";
import * as path from "path";
import * as fs from "fs";

const app = express();
const port = 3000;

interface Post {
  id: number;
  title: string;
  body: string;
}
let nextId = 4;

const posts: Post[] = [
  {
    id: 1,
    title: "title1",
    body: "body1",
  },
  {
    id: 2,
    title: "title2",
    body: "body2",
  },
  {
    id: 3,
    title: "title3",
    body: "body3",
  },
];

/* app.get("/", (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "..", "index.html");

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).send("<h1>File Not Found</h1>");
    }

    res.status(200).type("text/html").send(data);
  });
}); */

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;

  const targetItem = posts.find((item) => item.id === Number(id));

  if (targetItem) {
    res.status(200).json({
      data: targetItem,
      status: "ok",
    });
  } else {
    res.status(404).json({
      message: "Item not found! :(",
      status: "NOT okay",
    });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
