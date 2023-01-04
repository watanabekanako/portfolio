import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
const TagList = () => {
  const tagURL = "http://localhost:3000/posts/tags";
  // カテゴリをエンドポイントからaxiosにて取得
  const [tag, setTag] = React.useState<
    | {
        tags: { id: number; name: string; _count: any }[];
      }
    | undefined
  >();
  React.useEffect(() => {
    axios.get(tagURL).then((response) => {
      setTag(response.data);
    });
  }, []);

  console.log(tag);
  return (
    <>
      <Typography
        sx={{ borderBottom: 1, borderColor: "#f2809e", marginBottom: 2 }}
      >
        #Tag
      </Typography>
      {tag?.tags?.map((data: any, index: any) => {
        return (
          <>
            <Link to={`/blog/tag/${data.id}`}>
              <Box
                key={data.id}
                sx={{
                  display: "inline-flex",
                  justifyContent: "center",
                  backgroundColor: "#eee",
                  borderRadius: 1,
                  marginBottom: "10px",
                  marginRight: 2,
                  padding: 1,
                }}
              >
                <LocalOfferIcon sx={{ color: "pink" }} />
                <Typography>{data.name}</Typography>
              </Box>
            </Link>
          </>
        );
      })}
    </>
  );
};

export default TagList;
