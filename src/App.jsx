
import {BrowserRouter, Route, Routes } from "react-router"
import Home from "./Pages/Home/Home"
import CreateBlog from "./Pages/CreateBlog/CreateBlog"
// import Header from "./Components/Header/Header"

const App = () => {
  return (
    <div>
      <BrowserRouter>
      {/* <Header/> */}
       <Routes>
        <Route path="/" element={<CreateBlog/>} ></Route>
        <Route path="/blogs" element={<Home/>} />
       </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App