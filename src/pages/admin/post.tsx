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
import TagList from "../../componets/tagList";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import App from "../../componets/catchImg";

function Post() {
  // idの取得
  const { id } = useParams();
  // やりたいこと
  // post にセットされているのは、既存のデータ。
  // これを編集

  const [post, setPost] = React.useState<
    | {
        id?: number;
        title?: string;
        description?: string;
        content?: string;
        createdAt?: number;
        categoryId?: number;
      }
    | undefined
  >();
  // const [title, setTitle] = React.useState();
  React.useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/posts/${id}`).then((response) => {
        setPost(response.data?.post);
      });
    }
  }, []);

  //   その取得したIDをURLのに入れる→投稿データ取得できる
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setPost({ ...post, categoryId: Number(event.target.value) });
    }
  };
  // 登録するボタン
  const handleSubmit = () => {
    axios
      .put(`http://localhost:3000/posts/${id}`, { ...post })
      .then((response) => {
        alert("更新しました");
      });
  };
  console.log(post);
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
              カテゴリ
            </Typography>
            <Box textAlign="right">
              {/* <Typography component="p">{post?.post.createdAt}</Typography> */}
            </Box>
            <Typography>タイトル</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              sx={{ width: 600 }}
              // valueで現在の値を取得
              value={post?.title}
              onChange={(e: any) => {
                setPost({ ...post, title: e.target.value });
              }}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              sx={{ width: 600 }}
              // valueで現在の値を取得
              value={post?.content}
              onChange={(e: any) => {
                setPost({ ...post, content: e.target.value });
              }}
            />

            <Box textAlign="center">
              <Button
                sx={{ marginTop: 6, backgroundColor: "#fedcac" }}
                variant="contained"
              >
                一覧へ戻る
              </Button>
            </Box>
          </Grid>
          <Grid item xs={1} sx={{ marginTop: 10 }}></Grid>
          <Grid item xs={2} sx={{ marginTop: 10 }}>
            <FormLabel id="demo-radio-buttons-group-label">カテゴリ</FormLabel>
            <FormControl>
              {category?.categories.map((data) => {
                return (
                  <>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      value={post?.categoryId}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value={data.id}
                        label={data.name}
                        control={
                          <Radio checked={data.id === post?.categoryId} />
                        }
                      />
                    </RadioGroup>
                  </>
                );
              })}

              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              ></RadioGroup>
            </FormControl>
            <App />
            {/* カテゴリグループ */}
          </Grid>
        </Grid>
        <Button onClick={handleSubmit}>更新する</Button>
      </Box>
    </DefaultLayout>
  );
}

export default Post;
