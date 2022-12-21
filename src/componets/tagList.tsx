import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
const TagList = () => {
  const tagURL = "http://localhost:3000/posts/tags";
  // カテゴリをエンドポイントからaxiosにて取得
  const [tag, setTag] = React.useState<
    | {
        tags: { id: number; name: string }[];
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
            <Grid item xs={4} key={data.id} component="span">
              <Typography
                component="span"
                sx={{
                  backgroundColor: "#eee",
                  borderRadius: 1,
                  marginBottom: "10px",
                  marginRight: 2,
                  padding: 1,
                  display: "inline-block",
                }}
              >
                <LocalOfferIcon sx={{ color: "pink" }} />
                {data.name}
              </Typography>
            </Grid>
          </>
        );
      })}
    </>
  );
};

export default TagList;
