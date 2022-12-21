import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
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
      <Typography sx={{ borderBottom: 1, borderColor: "#53a4d6" }}>
        カテゴリ
        {category?.categories?.map((data: any, index: any) => {
          return (
            <>
              <Grid item xs={4} key={data.id}>
                <Typography sx={{ marginBottom: 2 }}>
                  {data.name}
                  <Typography
                    sx={{ backgroundColor: "#fff", borderColor: "gray" }}
                  >
                    {data._count.posts}
                  </Typography>
                </Typography>
              </Grid>
            </>
          );
        })}
      </Typography>
    </>
  );
};

export default CategoryList;
