import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import App from "../../componets/catchImg";
import { Link } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";
import useGetCategory from "../../hooks/useGetCategory";
import useGetAnPost from "../../hooks/useGetPost";
import NewCategory from "../../features/newCategory";
const KeyCodes = {
  comma: 188,
  enter: 13,
};

function isNumber(value: any): boolean {
  return !Number.isNaN(parseInt(value));
}
const EditPost = () => {
  type PostInput = {
    title?: string;
    description?: string;
    content?: string;
    createdAt?: number;
    categoryId?: number;
    tags?: {
      id?: number;
      name: string;
    }[];
    thumbnailUrl?: string;
  };
  type PostErrors = Partial<Record<keyof PostInput, string>>;
  // idの取得
  const { id } = useParams();
  const navigate = useNavigate();
  const categories = useGetCategory();
  const [post, setPost] = React.useState<PostInput | undefined | undefined>();

  const [tags, setTags] = React.useState<
    { id: number; name: string }[] | undefined
  >();

  // エラーがはいってくる場所
  const [formErrors, setFormErrors] = React.useState<PostErrors>({});
  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then((response) => {
        setPost(response.data?.post);
      });
    }
  }, []);
  const posts = useGetAnPost({ postId: Number(id) });
  //   その取得したIDをURLのに入れる→投稿データ取得できる
  const categoryURL = "/posts/categories";
  const tagURL = "/posts/tags";
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
    axios.get(tagURL).then((response) => {
      setTags(response.data.tags);
    });
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setPost({ ...post, categoryId: Number(event.target.value) });
    }
  };
  const validate = (post: any) => {
    const errors: PostErrors = {};
    if (!post.title) {
      errors.title = "タイトルを入力してください";
    }
    if (!post.description) {
      errors.description = "descriptionを入力してください";
    }
    if (!post.content) {
      errors.content = "contentを入力してください";
    }
    return errors;
  };
  // 登録するボタン
  const handleSubmit = () => {
    const errors = validate(post);
    setFormErrors(errors);
    if (Object.keys(errors)) {
      axios
        .put(`/posts/${id}`, { ...post })
        .then((response) => {
          // 更新後の処理
          navigate("/blog");
        })
        .catch((e) => {});
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Box textAlign="right"></Box>
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
              helperText={formErrors.title}
              error={Boolean(formErrors.title)}
            />
            <Typography>description</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              sx={{ width: 600 }}
              // valueで現在の値を取得
              value={post?.description}
              onChange={(e: any) => {
                setPost({ ...post, description: e.target.value });
              }}
              helperText={formErrors.description}
              error={Boolean(formErrors.description)}
            />
            <Typography>内容</Typography>
            <TextField
              // 複数行入力できるように
              multiline
              rows={10}
              maxRows={10}
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              sx={{ width: 600 }}
              // valueで現在の値を取得
              value={post?.content}
              onChange={(e: any) => {
                setPost({ ...post, content: e.target.value });
              }}
              helperText={formErrors.content}
              error={Boolean(formErrors.content)}
            />
            <Box
              textAlign="center"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
                mb: 2,
                gap: 2,
              }}
            >
              <Link to={`/admin`}>
                <Button sx={{ backgroundColor: "#fedcac" }} variant="contained">
                  一覧へ戻る
                </Button>
              </Link>
              <Button onClick={handleSubmit} variant={"contained"}>
                更新する
              </Button>
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ marginTop: 4 }}>
            <Paper sx={{ p: 2 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                sx={{ display: "block" }}
              >
                カテゴリ
              </FormLabel>
              <FormControl>
                {category?.categories.map((data) => {
                  return (
                    <React.Fragment key={data.id}>
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
                    </React.Fragment>
                  );
                })}
                <NewCategory />
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                ></RadioGroup>
              </FormControl>
              <ReactTags
                tags={post?.tags?.map((tag) => ({
                  id: String(tag.id),
                  text: tag.name,
                }))}
                suggestions={tags?.map((tag) => ({
                  id: String(tag.id),
                  text: tag.name,
                }))}
                delimiters={[KeyCodes.comma, KeyCodes.enter]}
                handleDelete={(index) => {
                  setPost({
                    ...post,
                    tags: post?.tags?.filter((tag, i) => i !== index),
                  });
                }}
                handleAddition={(value) => {
                  setPost({
                    ...post,
                    tags: [
                      ...(post?.tags ?? []),
                      {
                        id: isNumber(value.id) ? Number(value.id) : undefined,
                        name: value.text,
                      },
                    ],
                  });
                }}
                handleDrag={(tag, currPos, newPos) => {
                  const tags = [...(post?.tags ?? [])];
                  tags.splice(currPos, 1);
                  tags.splice(newPos, 0, {
                    id: Number(tag.id),
                    name: tag.text,
                  });
                  setPost({
                    ...post,
                    tags,
                  });
                }}
                inputFieldPosition="bottom"
                autocomplete
              />
              <App />
              {/* カテゴリグループ */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EditPost;
