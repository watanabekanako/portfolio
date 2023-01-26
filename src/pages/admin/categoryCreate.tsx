import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import DefaultLayout from "../../componets/layout/defaultlayout";
import { Paper, TextField } from "@mui/material";
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
  const [allcategory, setAllCategory] = React.useState<
    | {
        categories: { name: string; id: number }[];
      }
    | undefined
  >();

  console.log("category", allcategory);

  const [newCategory, setNewCategory] = React.useState<{
    name: string;
  }>();

  React.useEffect(() => {
    axios.get("http://localhost:3000/posts/categories").then((response) => {
      setAllCategory(response.data);
    });
  }, []);

  const handleSubmit = () => {
    axios
      .post(`http://localhost:3000/posts/categories/`, { ...newCategory })
      .then((response) => {
        alert("更新しました");
        // console.log(response.data);
        //localhost:3000/posts/categoriesにて再取得したい
        axios.get("http://localhost:3000/posts/categories").then((response) => {
          setAllCategory(response.data);
        });
      });
  };
  console.log("newCategory", newCategory);
  const [selectedCategory, setSelectedCategory] = React.useState();
  console.log(selectedCategory);
  // 既存のカテゴリ編集ボタンのイベント
  const handleEdit = () => {
    alert("編集する");
    axios.get(`http://localhost:3000/posts/category/1`).then((response) => {
      setSelectedCategory(response.data);
    });
  };
  return (
    <DefaultLayout>
      <Grid container spacing={2} sx={{ my: 10 }}>
        <Grid item xs={3}>
          <Paper sx={{ py: 10, textAlign: "center" }}>
            <TextField
              // エラーメッセージ
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              sx={{ width: 1 }}
              value={newCategory?.name}
              name="category"
              onChange={(e: any) => {
                setNewCategory({ ...newCategory, name: e.target.value });
              }}
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
                {allcategory?.categories?.map((data: any, index: any) => {
                  return (
                    <TableRow>
                      <TableCell component="th">{data.name}</TableCell>
                      <p>
                        <span>
                          <Button onClick={handleEdit}>編集する</Button>
                        </span>
                        <span>
                          <Button>キャンセル</Button>
                        </span>
                      </p>
                    </TableRow>
                  );
                })}
                <TableCell align="left">
                  <TextField></TextField>

                  <Button variant={"contained"}> 新規カテゴリを更新</Button>
                  <Button variant={"contained"}> キャンセル</Button>
                </TableCell>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default CategoryCreate;
