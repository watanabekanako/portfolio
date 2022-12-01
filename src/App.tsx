import "./App.css";
import BlogList from "./pages/blog/index";
import Blog from "./pages/blog/blog";
import Top from "./pages/top";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import PostList from "./pages/admin/postlist";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Top />} />
        <Route path={`/blog`} element={<BlogList />} />
        <Route path={`/blog/blog`} element={<Blog />} />
        <Route path={`/admin/postlist`} element={<PostList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
