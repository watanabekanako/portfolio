import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const CategoryList = () => {
  const categoryURL = "http://localhost:3000/posts/categories";
  // カテゴリをエンドポイントからaxiosにて取得
  const [category, setCategory] = React.useState<
    | {
        categories: { id: number; name: string }[];
      }
    | undefined
  >();
  React.useEffect(() => {
    axios.get(categoryURL).then((response) => {
      setCategory(response.data);
    });
  }, []);

  console.log(category);
  return (
    <>
      <Typography
        sx={{ borderBottom: 1, borderColor: "#f2809e", marginBottom: 2 }}
      >
        Category
      </Typography>
      {category?.categories?.map((data: any, index: any) => {
        return (
          <>
            <Grid item xs={4} key={data.id}>
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
            </Grid>
          </>
        );
      })}
    </>
  );
};

export default CategoryList;
