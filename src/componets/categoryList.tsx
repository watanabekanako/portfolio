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
      <Typography sx={{ borderBottom: 1, borderColor: "yellow" }}>
        カテゴリ
        {category?.categories?.map((data: any, index: any) => {
          return (
            <>
              <Grid item xs={4} key={data.id}>
                <Typography>
                  {data.name}
                  <span>({data._count.posts})</span>
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
