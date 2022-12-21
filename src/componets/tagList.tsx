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
      <Typography sx={{ borderBottom: 1, borderColor: "#53a4d6" }}>
        #Tag
        {tag?.tags?.map((data: any, index: any) => {
          return (
            <>
              <Grid item xs={4} key={data.id}>
                <Typography
                  sx={{
                    backgroundColor: "#eee",
                    marginBottom: "10px",
                    display: "inline-block",
                  }}
                >
                  <LocalOfferIcon />
                  {data.name}
                </Typography>
              </Grid>
            </>
          );
        })}
      </Typography>
    </>
  );
};

export default TagList;
