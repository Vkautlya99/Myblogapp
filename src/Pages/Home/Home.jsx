import { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import { AiFillDelete } from "react-icons/ai";
import { HiMiniPencilSquare } from "react-icons/hi2";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch posts from the backend
  const getPost = async () => {
    try {
      const res = await fetch("http://localhost:5000/get-blogs");
      const data = await res.json();
      if (data.blogs) {
        setPosts(data.blogs);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  // Delete post function
  const deletePost = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/delete-blog/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Blog Deleted Successfully");
        getPost(); // Refresh posts after deletion
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  // Update post function
  const updatePost = async (id) => {
    const res = await fetch(`http://localhost:5000/update-blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      toast.success("Blog Updated Successfully");
      setEditPost(false);
      setSelectedPost("");
      getPost(); // Refresh posts after update
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Toaster />
      <Header />

      <div className="container mx-auto my-12 flex flex-col gap-5">
        {posts.map((post) => (
          <div
            key={post._id}
            className="w-[80vw] lg:w-[50vw] border-gray-300 mt-10 mx-auto shadow-md rounded-md p-3"
          >
            <div className="flex gap-2 justify-end">
              <AiFillDelete
                className="text-2xl text-gray-500 hover:text-red-600 cursor-pointer hover:scale-110 transition-all"
                onClick={() => deletePost(post._id)}
              />
              <HiMiniPencilSquare
                className={`${
                  selectedPost === post._id && editPost
                    ? "text-yellow-400 scale-110"
                    : "text-gray-500"
                } text-2xl hover:text-yellow-400 cursor-pointer hover:scale-110 transition-all`}
                onClick={() => {
                  setEditPost(!editPost);
                  setSelectedPost(post._id);
                  setTitle(post.title); // Load existing title
                  setDescription(post.description); // Load existing description
                }}
              />
            </div>
            {selectedPost === post._id && editPost ? (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border p-2 rounded-md mb-2"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border p-2 rounded-md"
                ></textarea>
                <button
                  className="bg-yellow-400 text-white p-1 rounded-md hover:bg-yellow-500 w-16 text-sm font-semibold mt-2"
                  onClick={() => updatePost(post._id)}
                >
                  SAVE
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-600 hover:text-gray-700 my-3">
                  {post.title}
                </h2>
                <h3 className="font-semibold my-2">{post.description}</h3>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
