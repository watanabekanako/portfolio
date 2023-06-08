import "./App.css";
import Top from "./pages/user/top";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import EditPost from "./pages/admin/addPost";
import CategoryPost from "./pages/user/blog/category";
import Tag from "./pages/user/blog/tag";
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
