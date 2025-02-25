import { Link } from "react-router"


const Header = () => {
  return (
    
      <nav className="fixed w-full top-0 z-50 flex items-center justify-center gap-6 py-4 bg-gray-100 shadow-md">
        <Link to="/" className="text-xl font-semibold text-gray-700 ">Create</Link>
        <Link to="/blogs" className="text-xl font-medium text-gray-700 ">Blogs</Link>
      </nav>
  )
}

export default Header;


