const express = require("express");
const app = express();
const cors = require("cors");
const { connectDb } = require("./connection");
const { BlogPost } = require("./models/BlogPost");
const path = require("path"); // ✅ Importing path module

const port = 5000;

// Database Connection
connectDb();

// Middlewares
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    express.static(path.join(__dirname, "client", "dist"))(req, res, next);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Routes
app.post("/post-blog", async (req, res) => {
    let Post = new BlogPost({
        title: req.body.title,
        description: req.body.description,
    });

    await Post.save();
    res.json({ message: "Post has been created" });
});

app.get("/get-blogs", async (req, res) => {
    let blogs = await BlogPost.find();
    if (!blogs) {
        res.status(400).json({ message: "No blog found" });
    } else {
        res.status(200).json({ blogs });
    }
});

app.delete("/delete-blog/:id", async (req, res) => {
    let blog = await BlogPost.findByIdAndDelete(req.params.id);

    if (!blog) {
        res.status(400).json({ message: "No blog found" });
    } else {
        res.status(200).json({ blog });
    }
});

// Update code
app.put("/update-blog/:id", async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title && !description) {
            return res.status(400).json({ message: "Please provide a title or description to update" });
        }

        // Update the blog with the given ID
        const blog = await BlogPost.findByIdAndUpdate(
            req.params.id,
            { title, description }, // Updating only provided fields
            { new: true } // Returns updated document
        );

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json({ message: "Blog Updated Successfully", blog });
    } catch (error) {
        console.error("Error updating blog:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Listen Server
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
