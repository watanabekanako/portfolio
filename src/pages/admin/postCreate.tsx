import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DefaultLayout from "../../componets/layout/defaultlayout";
import {
  Alert,
  Button,
  FormHelperText,
  Snackbar,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CatchImg from "../../componets/catchImg";
import { Link } from "react-router-dom";
import {WithContext as ReactTags} from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

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
// keyof: オブジェクトのキーの配列
// Record: <配列のキーの型, valueの型>
// Partial: オブジェクトを全てoptionalにする
type PostErrors = Partial<Record<keyof PostInput, string>>;

function PostCreate() {
  // idの取得
  const { id } = useParams();

  const [post, setPost] = React.useState<
    | PostInput
    | undefined
  >();
  const [formErrors, setFormErrors] = useState<PostErrors>({});

  const [snackMessage, setSnackMessage] = useState<string | undefined>();
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error" | undefined>("success");


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

  const tagURL = "http://localhost:3000/posts/tags";
  const [tags, setTags] = React.useState<
      | { id: number; name: string }[]
      | undefined
      >();

  React.useEffect(() => {
    axios.get(categoryURL).then((response) => {
      setCategory(response.data);
    });
    axios.get(tagURL).then((response) => {
      setTags(response.data.tags);
    })
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setPost({ ...post, categoryId: Number(event.target.value) });
    }
  };

  // 全項目のエラーを確認してエラーオブジェクトを返す関数
  const validate = (post: any) => {
    const errors: PostErrors = {};
    if (!post.title) {
      errors.title = "タイトルを入力してください。";
    }
    if (!post.content) {
      errors.content = "内容を入力してください。";
    }
    if (!post.categoryId) {
      errors.categoryId = "カテゴリを選択してください。";
    }
    return errors;
  };
  console.log("ぽすと", post);
  // 登録するボタン
  const handleSubmit = () => {
    const errors = validate(post);
    setFormErrors(errors);
    // errorsの中に何もエラーが設定されていなければリクエスト
    if (Object.keys(errors).length === 0) {
        axios
          .post(`http://localhost:3000/posts/`, { ...post })
          .then((response) => {
            // 成功時の処理
            setSnackSeverity("success");
            setSnackMessage("投稿が完了しました。");
          })
          .catch((e) => {
            setSnackSeverity("error");
            setSnackMessage("投稿が失敗しました。");
          })
    }
  };

  return (
    <DefaultLayout>
      <Box sx={{ flexGrow: 1, mt:2  }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography>タイトル</Typography>
            <TextField
              // エラーメッセージ
              // helperText={errors.title}
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              sx={{ width: 600 }}
              value={post?.title}
              name="title"
              onChange={(e: any) => {
                setPost({ ...post, title: e.target.value });
              }}
              error={Boolean(formErrors.title)}
              helperText={formErrors.title}
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
              value={post?.content}
              onChange={(e: any) => {
                setPost({ ...post, content: e.target.value });
              }}
              error={Boolean(formErrors.content)}
              helperText={formErrors.content}
            />
            <Box
                textAlign="center"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
                  mb: 2,
                  gap: 2
                }}
            >
              <Link to={`/admin`}>
                <Button
                  sx={{ backgroundColor: "#fedcac" }}
                  variant="contained"
                >
                  一覧へ戻る
                </Button>
              </Link>
              <Button
                  onClick={handleSubmit}
                  variant={"contained"}
              >更新する</Button>
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ marginTop: 4 }}>
            <Paper sx={{p:2}}>
              <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={{display: "block"}}
              >
                カテゴリ
              </FormLabel>
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
                <FormHelperText error={Boolean(formErrors.categoryId)}>
                  {formErrors.categoryId}
                </FormHelperText>
              </FormControl>
              <Typography>タグ</Typography>
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
                  handleDelete={() => {

                  }}
                  handleAddition={() => {

                  }}
                  handleDrag={() => {

                  }}
                  handleTagClick={() => {

                  }}
                  inputFieldPosition="bottom"
                  autocomplete
              />
              <CatchImg
                  value={post?.thumbnailUrl}
                  onChange={(files: any) => {
                    setPost({
                      ...post,
                      thumbnailUrl: files.map((file: any) =>
                          file.map((v: any) => v.path)
                      ),
                    });
                  }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={Boolean(snackMessage)}
          autoHideDuration={5000}
          onClose={() => {
            setSnackMessage(undefined);
          }}
      >
        <Alert severity={snackSeverity}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </DefaultLayout>
  );
}

export default PostCreate;
