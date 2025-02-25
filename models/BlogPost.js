const mongoose = require("mongoose");

const blogPostschema = new mongoose.Schema({
  title: String,
  description: String,
},
{timestamps : true}
);

const BlogPost = mongoose.model("BlogPost", blogPostschema);
module.exports = { BlogPost };
