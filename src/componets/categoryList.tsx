import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useGetCategory from "../hooks/useGetCategory";
const CategoryList = () => {
  const categories = useGetCategory();
  return (
    <>
      <Typography
        sx={{ borderBottom: 1, borderColor: "#f2809e", marginBottom: 2 }}
      >
        Category
      </Typography>

      {categories?.categories.map((data: any, index: number) => {
        return (
          <React.Fragment key={data.id}>
            <Grid item xs={4}>
              <Link to={`/blog/category/${data.id}`}>
                <Typography sx={{ marginBottom: 2 }}>
                  {data.name}
                  <Typography
                    component="span"
                    sx={{
                      backgroundColor: "#fff",
                      border: 1,
                      padding: 1,
                      color: "#888",
                      margin: 2,
                      borderColor: "#eee",
                      borderRadius: 1,
                    }}
                  >
                    {data._count.posts}
                  </Typography>
                </Typography>
              </Link>
            </Grid>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CategoryList;
