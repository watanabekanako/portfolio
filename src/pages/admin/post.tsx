import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DefaultLayout from "../../componets/layout/defaultlayout";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import CategoryList from "../../componets/categoryList";
import TextField from "@mui/material/TextField";
import { PostAddOutlined } from "@mui/icons-material";
function Post() {
  // やりたいこと
  // post にセットされているのは、既存のデータ。
  // これを編集

  const [post, setPost] = React.useState<
    | {
        post: {
          id: number;
          title: string;
          description: string;
          content: string;
          createdAt: number;
        };
      }
    | undefined
  >();
  const [title, setTitle] = React.useState();
  React.useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((response) => {
      setPost(response.data);
      setTitle(response.data?.post?.title);
    });
  }, []);
  // console.log(post?.post.title);

  // idの取得
  const { id } = useParams();

  // 登録するボタン
  const handleSubmit = () => {
    axios.post(`http://localhost:3000/posts/${id}`).then((response) => {
      setTitle(title);
    });
  };

  //   その取得したIDをURLのに入れる→投稿データ取得できる

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
              {/* <Typography component="p">{post?.post.createdAt}</Typography> */}
            </Box>
            {/* タイトル */}
            <TextField
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              sx={{ width: 600 }}
              // valueで現在の値を取得
              value={title}
              onChange={(e: any) => {
                setPost(e.target.value);
              }}
            />

            <TextField
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              sx={{ width: 600 }}
              // valueで現在の値を取得
              value={title}
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
            />

            <Box textAlign="center">
              {/* <Button
                sx={{ marginTop: 6, backgroundColor: "#fedcac" }}
                variant="contained"
              >
                一覧へ戻る
              </Button> */}
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
        <Button onClick={handleSubmit}>登録する</Button>
      </Box>
    </DefaultLayout>
  );
}

export default Post;
