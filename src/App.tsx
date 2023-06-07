import "./App.css";
import BlogList from "./pages/user/index";
import Blog from "./pages/user/Blog";
import Top from "./pages/user/top";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import PostList from "./pages/admin/postlist";
import EditPost from "./pages/admin/addPost";
import CategoryPost from "./pages/user/category";
import Tag from "./pages/user/tag";
import PostCreate from "./pages/admin/postCreate";
import CategoryCreate from "./pages/admin/categoryCreate";
import ScrollTop from "./componets/scrollTop";
import axios from "axios";
import MainRouter from "./routes/MainRouter";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// 動的ルーティング

const App = () => {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
};

export default App;
