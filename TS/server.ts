import express, { Response, Request} from "express";

const app = express();
const port = 3000;

app.use(express.json());

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

app.get("/posts", (req: Request, res: Response) => {
  res.send(posts);
});

app.get("/posts/:id", (req: Request, res: Response) => {
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
      status: "Not okay",
    });
  }
});

app.post("/posts", (req: Request, res: Response) => {
  const { title, body } = req.body;
  const newPost: Post = { id: nextId++, title, body };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put("/posts/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const targetItem = posts.find((item) => item.id === Number(id));

  if (targetItem) {
    targetItem.title = title;
    targetItem.body = body;
    res.status(200).json(`Post id = ${targetItem.id}, updated`);
  } else {
    res.status(404).json({
      message: "Item not found! :(",
      status: "Not okay",
    });
  }
});

app.delete("/posts/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const index = posts.findIndex((item) => item.id === Number(id));
  
    if (index !== -1) {
      posts.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "Item not found! :(",
        status: "Not okay",
      });
    }
  });
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
