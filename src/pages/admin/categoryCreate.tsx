import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import AdminLayout from "../../componets/layout/adminLayout";
import { Alert, Paper, Snackbar, Stack, TextField } from "@mui/material";
import { Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Pagination } from "@mui/material";
type Inputs = {
  newCategoryName: string;
};
const CategoryCreate = () => {
  // snackbarのbooleanの管理
  const [open, setOpen] = React.useState(false);
  // react-chook-form
  const { control, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: { newCategoryName: "" },
  });
  const validationRules = {
    name: {
      required: "新しいカテゴリ名を入力してください",
      maxLength: { value: 6, message: "6文字以内で入力してください" },
      validate: {
        categoryExists: (value: string) => {
          const categoryExists = allCategory?.categories.some(
            (category: { name: string }) => category.name === value
          );
          if (categoryExists) {
            return "入力されたカテゴリ名は既に存在します";
          }
          return true;
        },
      },
    },
  };
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const errors: { name?: string } = {};
    if (Object.keys(errors).length === 0) {
      axios
        .post(`/posts/categories/`, { name: data.newCategoryName })
        .then((response) => {
          axios.get("/posts/categories").then((response) => {
            setAllCategory(response.data);
            reset({ newCategoryName: "" });
          });
          setOpen(true);
        });
    }
  };
  const [allCategory, setAllCategory] = React.useState<
    | {
        categories: { name: string; id: number }[];
      }
    | undefined
  >();
  const [selectedCategory, setSelectedCategory] = React.useState<
    | {
        category: { name?: string; id?: number };
      }
    | undefined
  >();
  // エラーメッセージの管理
  React.useEffect(() => {
    axios.get("posts/categories").then((response) => {
      setAllCategory(response.data);
    });
  }, []);

  // selectedCategory?.category?.idにて選択したcategoryのidがとれる
  // 既存のカテゴリ編集ボタンのイベント
  const handleEdit = (id: any) => {
    axios.get(`/posts/categories/${id}`).then((response) => {
      setSelectedCategory(response.data);
    });
  };
  // カテゴリを更新するボタン
  const handleUpdate = (id: number) => {
    axios
      .put(`/posts/categories/${id}`, selectedCategory?.category)
      .then((response) => {
        axios.get("/posts/categories").then((response) => {
          setAllCategory(response.data);
          setSelectedCategory(undefined);
        });
      });
  };
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/posts/categories/${id}`);
      const response = await axios.get("/posts/categories");
      setAllCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminLayout>
      <Typography
        sx={{ textAlign: "center", my: 6 }}
        component="h2"
        variant="h4"
      >
        カテゴリ一覧
      </Typography>
      <Snackbar
        autoHideDuration={3000}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          新しいカテゴリが追加されました
        </Alert>
      </Snackbar>
      <Grid container spacing={2} sx={{ my: 10 }}>
        <Grid item xs={3}>
          <Paper sx={{ py: 4, px: 2, textAlign: "center" }}>
            <Stack
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              spacing={2}
            >
              <Controller
                name="newCategoryName"
                control={control}
                rules={validationRules.name}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="text"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    placeholder="カテゴリ名を入力してください"
                  />
                )}
              />
              <Button type="submit" variant={"contained"} sx={{ my: 4 }}>
                新規カテゴリーを追加する
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={9}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>カテゴリー</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCategory?.categories?.map(
                  (data: { name: string; id: number }, index: number) => {
                    return (
                      <TableRow key={data.id}>
                        <TableCell component="th">{data.name}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleEdit(data.id)}>
                            編集する
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => handleDelete(data.id)}>
                            削除する
                          </Button>
                        </TableCell>

                        {selectedCategory?.category.id === data.id ? (
                          <>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              margin="dense"
                              sx={{ width: 1 }}
                              name="category"
                              // selectedCategory?.category?.nameで選択した現在のカテゴリ名の表示
                              value={selectedCategory?.category?.name}
                              onChange={(e: any) => {
                                setSelectedCategory({
                                  category: {
                                    name: e.target.value,
                                    id: selectedCategory?.category?.id,
                                  },
                                });
                              }}
                            ></TextField>
                            <Button
                              variant={"contained"}
                              onClick={() => handleUpdate(data.id)}
                            >
                              カテゴリを更新する
                            </Button>
                            <Button
                              sx={{ mx: 2, backgroundColor: "pink" }}
                              variant={"contained"}
                              onClick={() => setSelectedCategory(undefined)}
                            >
                              キャンセル
                            </Button>
                          </>
                        ) : null}
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default CategoryCreate;
