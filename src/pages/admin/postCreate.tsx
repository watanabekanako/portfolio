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
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Link } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";
import StyledButton from "../../componets/styledButton";
import ImageUploader from "../../componets/imgupload";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import useGetCategory from "../../hooks/useGetCategory";
import NewCategory from "../../features/newCategory";
type Inputs = {
  title?: string;
  description?: string;
  content?: string;
  createdAt?: number;
  // categoryId?: number;
  tags?: {
    id?: number;
    name: string;
  }[];
  thumbnailUrl?: string;
};
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

function isNumber(value: any): boolean {
  return !Number.isNaN(parseInt(value));
}

const PostCreate = () => {
  const navigate = useNavigate();
  const category = useGetCategory();
  console.log(category, "category");
  const [post, setPost] = React.useState<PostInput | undefined>();
  const [formErrors, setFormErrors] = useState<PostErrors>({});

  const [snackMessage, setSnackMessage] = useState<string | undefined>();
  const [snackSeverity, setSnackSeverity] = useState<
    "success" | "error" | undefined
  >("success");

  const tagURL = "http://localhost:3000/posts/tags";
  const [tags, setTags] = React.useState<
    { id: number; name: string }[] | undefined
  >();

  React.useEffect(() => {
    axios
      .get(tagURL)
      .then((response) => {
        setTags(response.data.tags);
      })
      .catch((e) => {
        setSnackMessage("データの取得に失敗しました");
      });
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setPost({ ...post, categoryId: Number(event.target.value) });
    }
  };
  // react-hook-form
  const { control, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: { title: "", description: "", content: "" },
  });
  const validationRules = {
    title: {
      required: "タイトルを入力してください",
      minLength: { value: 4, message: "4文字以上で入力してください" },
    },
    description: {
      required: "descriptionを入力してください",
      minLength: { value: 4, message: "10文字以上で入力してください" },
    },
    content: {
      required: "ブログの内容を入力してください",
      minLength: { value: 4, message: "10文字以上で入力してください" },
    },
  };

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    axios.post(`http://localhost:3000/posts/`, { ...post }).then((response) => {
      setSnackSeverity("success");
      setSnackMessage("投稿が完了しました。");
      navigate(`/blog/`);
      reset();
    });
  };
  return (
    <DefaultLayout>
      <Box sx={{ flexGrow: 1, mt: 10, mb: 30 }}>
        <Stack
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
          sx={{ width: "80%" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography>タイトル</Typography>

              <Controller
                name="title"
                control={control}
                rules={validationRules.title}
                render={({ field, fieldState }) => (
                  <TextField
                    // エラーメッセージ
                    {...field}
                    type="text"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    placeholder={"タイトルを入力してください"}
                  />
                )}
              />
              <Typography>description</Typography>
              <Controller
                name="description"
                control={control}
                rules={validationRules.description}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="text"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    placeholder={"descriptionを入力してください"}
                  />
                )}
              />
              <Typography>内容</Typography>
              <Controller
                name="content"
                control={control}
                rules={validationRules.content}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    // 複数行入力できるように
                    multiline
                    rows={10}
                    maxRows={10}
                    type="text"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    placeholder={"内容を入力してください"}
                  />
                )}
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
                  <Button
                    sx={{ backgroundColor: "#fedcac" }}
                    variant="contained"
                  >
                    一覧へ戻る
                  </Button>
                </Link>
                <StyledButton type="submit">登録する</StyledButton>
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
                {/* <FormControl>
                  {category?.categories.map((data: any) => {
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
                </FormControl> */}
                <Typography>タグ</Typography>
                {/* <ReactTags
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
                /> */}

                {/* <ImageUploader
                  onUploadCompleted={(url: any) => {
                    // urlをpostのthumbnailUrlにセットする
                    setPost({
                      ...post,
                      thumbnailUrl: url,
                    });
                  }}
                /> */}
              </Paper>
            </Grid>
          </Grid>
        </Stack>
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
        <Alert severity={snackSeverity}>{snackMessage}</Alert>
      </Snackbar>
    </DefaultLayout>
  );
};

export default PostCreate;
