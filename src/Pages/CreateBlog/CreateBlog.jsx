// import { useEffect, useState } from "react"
import toast, {Toaster} from "react-hot-toast";
import Header from "../../Components/Header/Header"
import {useNavigate} from "react-router-dom"

const CreateBlog = () => {

  // const [postblog, setPostBlog] = useState([])

  const navigate = useNavigate();


  const postData = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    console.log(title, description)

    const blog = {
      title,
      description,
    };

    //below code is to send the data to the backend server
    const res = await fetch("http://localhost:5000/post-blog",{
      method : "POST",
      headers :{
        "Content-type" : "application/json"
      },
      body : JSON.stringify(blog)
    })

    if(res.status === 200){

      toast.success("Blog Posted Succesfully");
      e.target.title.value = "";
      e.target.description.value = "";
      setTimeout(() => {
        
        navigate("/blogs")
      }, 1500);

    }else{
      alert("Something ent wrong")
    }

  }

  
  return (
    <>
    <Header/>
    <Toaster/>
    <div className="w-[90vw] mt-20 lg:w-[60vw] mx-auto ">
      <h1 className="sm:text-center font-semibold text-2xl mb-4 sm:mb-0 ">Create Blog</h1>

      <form action="" className="flex flex-col sm:gap-2 gap-3" onSubmit={postData}>
        <label htmlFor="title" className="font-semibold text-lg ">Title :</label>
        <input type="text" name="title" id="" placeholder="Enter the blog title" className="px-3 py-3 rounded-md outline-none border border-gray-200 "/>


        <label htmlFor="description" className="font-semibold text-lg" >Description : </label>
        <textarea id="" name="description" className="px-3 rounded-md outline-none border border-gray-200 " rows={10}/>

        <button type="submit" className="bg-purple-600 hover:bg-purple-700 rounded-md py-3 font-semibold text-white text-xl upper" >Add Post</button>
      </form>


    </div>
    </>
  )
}

export default CreateBlog