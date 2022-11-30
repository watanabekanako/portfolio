import "./App.css";
import Blog from "./pages/Blog/index";
import Top from "./pages/Blog/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/blog`} element={<Blog />} />
        <Route path={`/`} element={<Top />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
