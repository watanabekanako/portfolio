import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DefaultLayout from "../../componets/layout/defaultlayout";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import CategoryList from "../../componets/categoryList";

function Blog() {
  const [post, setPost] = React.useState<
    | {
        post: {
          id: number;
          title: string;
          description: string;
          createdAt: number;
        };
      }
    | undefined
  >();
  React.useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((response) => {
      setPost(response.data);
    });
  }, []);

  // idの取得
  const { id } = useParams();
  console.log(id);
  //   その取得したIDをURLのに入れる→投稿データ取得できる
  console.log(post?.post.title);

  return (
    <DefaultLayout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography
              component="span"
              sx={{
                marginTop: 10,
                padding: "6px",
                backgroundColor: "#fedcac",
                display: "inline-block",
                borderRadius: "14px",
              }}
            >
              カテゴリ名
            </Typography>
            <Box textAlign="right">
              <Typography component="p">{post?.post.createdAt}</Typography>
            </Box>
            <Paper sx={{ marginTop: 1, padding: 2 }}>タイトル</Paper>

            <Paper sx={{ marginTop: 6, padding: 2 }}>
              <div>ユーザーID： {id}です </div>
              {post?.post.title}
              {post?.post.description}
            </Paper>
            <Box textAlign="center">
              {/* <Button
                sx={{ marginTop: 6, backgroundColor: "#fedcac" }}
                variant="contained"
              >
                一覧へ戻る
              </Button> */}
              {/* <ButtonOrange /> */}
            </Box>
          </Grid>
          <Grid item xs={1} sx={{ marginTop: 10 }}></Grid>
          <Grid item xs={2} sx={{ marginTop: 10 }}>
            {/* カテゴリグループ */}
            <CategoryList />
            {/* タググループ */}

            <Typography
              sx={{ marginTop: 4, borderBottom: 2, borderColor: "#fedcac" }}
            >
              Tag
            </Typography>
            <Typography>Food(12)</Typography>
            <Typography>Travel(10)</Typography>
            <Typography>Game(10)</Typography>
          </Grid>
        </Grid>
      </Box>
    </DefaultLayout>
  );
}

export default Blog;
