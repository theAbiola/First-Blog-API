import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// GET All posts
app.get("/posts", (req,res) => {
  console.log(posts);
  res.json(posts);
})

// GET a specific post by id
app.get("/posts/:id", (req,res) => {
  const idOfPost =  parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === idOfPost );
  //here we handle an edge case where the post that the user wishes to find isn't found.
  if (!foundPost) return res.status(404).json({ message: "Post not found" });
  console.log(foundPost);
  res.json(foundPost);
})

// POST a new post
app.post("/posts", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content:  req.body.content,
    author: req.body.author,
    date: new Date(),
  }
  posts.push(newPost);
  console.log(posts[-1]);
  res.status(201).json(newPost);
})

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const idOfPost = parseInt(req.params.id);
  var existingPost = posts.find((post) => post.id === idOfPost);
  if (!existingPost) return res.status(404).json({ message: "Post not found" });

  const updatePost = {
    id: idOfPost,
    title: req.body.title || existingPost.title,
    content:  req.body.content ||  existingPost.content,
    author: req.body.author || existingPost.author,
    date: new Date(),
  }
  // replace existing post with post update
  existingPost = updatePost;
  res.json(updatePost);
})

// DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const idOfPost = parseInt(req.params.id);
  const findPostIndex = posts.findIndex((post) => post.id === idOfPost);
  if (findPostIndex){
    posts.splice(findPostIndex, 1);
    console.log("Post deleted");
    res.json({message: `Post deleted`});
  }
  else {
    res.status(404).json({error: `post with id not found`});
  }
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
