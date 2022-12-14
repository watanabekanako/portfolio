import React from "react";
import axios from "axios";
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
              <li key={index} value={data.id}>
                <Typography>
                  {data.name}
                  <span>({data._count.posts})</span>
                </Typography>
              </li>
            </>
          );
        })}
      </Typography>
    </>
  );
};

export default CategoryList;
