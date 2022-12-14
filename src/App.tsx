import "./App.css";
import BlogList from "./pages/Blog/index";
import Blog from "./pages/Blog/Blog";
import Top from "./pages/top";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import PostList from "./pages/admin/postlist";

// 動的ルーティング

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Top />} />
        <Route path={`/blog`} element={<BlogList />} />
        <Route path={`/blog/blog`} element={<Blog />} />
        <Route path={`/admin/postlist`} element={<PostList />} />
        <Route path="/blog/:id" element={<Blog />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
