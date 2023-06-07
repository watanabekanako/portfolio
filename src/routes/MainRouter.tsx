import React from "react";
import Blog from "../pages/Blog/Blog";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../componets/layout/defaultlayout";
import Top from "../pages/top";
import PostList from "../pages/admin/postlist";
import BlogList from "../pages/Blog";
import CategoryPost from "../pages/category";
import CategoryCreate from "../pages/admin/categoryCreate";
import PostCreate from "../pages/admin/postCreate";
import EditPost from "../pages/admin/addPost";
const UserRoute = [
  { path: "/", element: <Top /> },
  { path: "/blog", element: <BlogList /> },
  { path: "/blog/:id", element: <Blog /> },
  { path: "blog/category/:id", element: <CategoryPost /> },
];
const AdminRoute = [
  { path: "/admin/posts", element: <PostList /> },
  { path: "/admin/posts/category", element: <CategoryCreate /> },
  { path: "/admin/posts/edit/:id", element: <EditPost /> },
  { path: "/admin/posts/add", element: <PostCreate /> },
  { path: "/", element: <Top /> },
];
const MainRouter = () => {
  return (
    <>
      <Routes>
        {UserRoute.map((route, index) => (
          <Route
            key={index}
            path={`${route.path}`}
            element={<DefaultLayout>{route.element}</DefaultLayout>}
          ></Route>
        ))}
        {AdminRoute.map((route, index) => (
          <Route
            key={index}
            path={`${route.path}`}
            element={<DefaultLayout>{route.element}</DefaultLayout>}
          ></Route>
        ))}
      </Routes>
    </>
  );
};

export default MainRouter;
