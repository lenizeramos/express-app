"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
let nextId = 4;
const posts = [
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
    }
    else {
        res.status(404).json({
            message: "Item not found! :(",
            status: "Not okay",
        });
    }
});
app.post("/posts", (req, res) => {
    const { title, body } = req.body;
    const newPost = { id: nextId++, title, body };
    posts.push(newPost);
    res.status(201).json(newPost);
});
app.put("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    const targetItem = posts.find((item) => item.id === Number(id));
    if (targetItem) {
        targetItem.title = title;
        targetItem.body = body;
        res.status(200).json(`Post id = ${targetItem.id}, updated`);
    }
    else {
        res.status(404).json({
            message: "Item not found! :(",
            status: "Not okay",
        });
    }
});
app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    const index = posts.findIndex((item) => item.id === Number(id));
    if (index !== -1) {
        posts.splice(index, 1);
        res.status(204).send();
    }
    else {
        res.status(404).json({
            message: "Item not found! :(",
            status: "Not okay",
        });
    }
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
