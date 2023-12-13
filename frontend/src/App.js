import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import BlogDetails from "./pages/blog/BlogDetails";
import NewBlog from "./pages/blog/NewBlog";
import AllBlogs from "./pages/blog/AllBlogs";
import MyBlog from "./pages/blog/MyBlog";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/my-blogs' element={<MyBlog/>}/>
        <Route path='/blogs'>
          <Route path='all' element={<AllBlogs/>}/>
          <Route path='create' element={<NewBlog/>}/>
          <Route path='blog/:bid' element={<BlogDetails/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
