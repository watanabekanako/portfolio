import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import DefaultLayout from "../../componets/layout/defaultlayout";
import { Paper, Stack, TextField } from "@mui/material";
import { Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { textAlign } from "@mui/system";
import Box from "@mui/material";
import axios from "axios";

const CategoryCreate = () => {
  const [allCategory, setAllCategory] = React.useState<
    | {
        categories: { name: string; id: number }[];
      }
    | undefined
  >();
  console.log("category", allCategory);

  const [newCategory, setNewCategory] = React.useState<{
    name?: string;
  }>();

  const [selectedCategory, setSelectedCategory] = React.useState<
    | {
        category: { name?: string; id?: number };
      }
    | undefined
  >();
  // エラーメッセージの管理
  const [formErrors, setFormErrors] = React.useState<
    | {
        name?: string;
      }
    | undefined
  >();
  React.useEffect(() => {
    axios.get("http://localhost:3000/posts/categories").then((response) => {
      setAllCategory(response.data);
    });
  }, []);

  // 引数のcategoryはnewCategory
  const validateNewCategory = (category: typeof newCategory) => {
    const errors:
      | {
          name?: string;
        }
      | undefined = {};
    if (!category?.name) {
      errors.name = "新規カテゴリを入力してください";
    }
    return errors;
  };

  // 新規カテゴリの追加
  // この中でバリデーションチェック
  const handleSubmit = () => {
    //入力値を確認してerrorsに入れる
    const errors = validateNewCategory(newCategory);
    //TextFieldにエラーメッセージを表示させるために、stateに登録
    setFormErrors(errors);
    // 上で定義したerrorsのkeyがあるかどうかで、エラーの有無の判定
    if (Object.keys(errors).length === 0) {
      axios
        .post(`http://localhost:3000/posts/categories/`, { ...newCategory })
        .then((response) => {
          //localhost:3000/posts/categoriesにて再取得したい
          axios
            .get("http://localhost:3000/posts/categories")
            .then((response) => {
              setAllCategory(response.data);
              setNewCategory({ name: "" });
            });
        });
    }
  };

  // selectedCategory?.category?.idにて選択したcategoryのidがとれる
  // 既存のカテゴリ編集ボタンのイベント
  const handleEdit = (id: any) => {
    axios
      .get(`http://localhost:3000/posts/categories/${id}`)
      .then((response) => {
        setSelectedCategory(response.data);
      });
  };
  // カテゴリを更新するボタン
  const handleUpdate = (id: number) => {
    axios
      .put(
        `http://localhost:3000/posts/categories/${id}`,
        selectedCategory?.category
      )
      .then((response) => {
        axios.get("http://localhost:3000/posts/categories").then((response) => {
          setAllCategory(response.data);
          setSelectedCategory(undefined);
        });
      });
  };

  // カテゴリを削除するボタン
  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/posts/categories/${id}`)
      .then((response) => {
        axios.get("http://localhost:3000/posts/categories").then((response) => {
          setAllCategory(response.data);
        });
      });
  };
  return (
    <DefaultLayout>
      <Grid container spacing={2} sx={{ my: 10 }}>
        <Grid item xs={3}>
          <Paper sx={{ py: 4, px: 2, textAlign: "center" }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: 1 }}
              value={newCategory?.name}
              name="category"
              onChange={(e: any) => {
                setNewCategory({ ...newCategory, name: e.target.value });
              }}
              error={Boolean(formErrors?.name)}
              helperText={formErrors?.name}
            />
            <Button onClick={handleSubmit} variant={"contained"} sx={{ my: 4 }}>
              新規カテゴリーを追加する
            </Button>
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
                {allCategory?.categories?.map((data: any, index: any) => {
                  console.log("data.id", selectedCategory?.category.id);
                  return (
                    <TableRow>
                      <TableCell component="th">
                        <p>{data.name}</p>
                        <span>
                          <Button onClick={() => handleEdit(data.id)}>
                            編集する
                          </Button>
                        </span>
                        <span>
                          <Button onClick={() => handleDelete(data.id)}>
                            削除する
                          </Button>
                        </span>
                      </TableCell>

                      {selectedCategory?.category.id === data.id ? (
                        <>
                          <Stack>
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
                              variant={"contained"}
                              onClick={() => setSelectedCategory(undefined)}
                            >
                              キャンセル
                            </Button>
                          </Stack>
                        </>
                      ) : null}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default CategoryCreate;
