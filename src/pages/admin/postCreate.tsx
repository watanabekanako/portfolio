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

function PostCreate() {
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
  console.log("ポスト", post);
  // 登録するボタン
  const handleSubmit = () => {
    axios.post(`http://localhost:3000/posts`).then((response) => {
      setPost(response.data);
    });
  };

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
    alert("チェック状態が変更されました");
  };
  console.log("post", post);
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
            <TextField
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              sx={{ width: 600 }}
              // valueで現在の値を取得
              value={post}
              onChange={(e: any) => {
                setPost(e.target.value);
              }}
            />
            {/* 
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
            /> */}

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
            <FormLabel id="demo-radio-buttons-group-label">カテゴリ</FormLabel>
            <FormControl>
              {category?.categories.map((data) => {
                return (
                  <>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value={data.name}
                        label={data.name}
                        control={<Radio onChange={handleChange} />}
                      />
                    </RadioGroup>
                  </>
                );
              })}

              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <App />
            {/* カテゴリグループ */}
            <CategoryList />
            {/* タググループ */}

            <TagList />
          </Grid>
        </Grid>
        <Button onClick={handleSubmit}>登録する</Button>
      </Box>
    </DefaultLayout>
  );
}

export default PostCreate;
// http://localhost:3000/posts
