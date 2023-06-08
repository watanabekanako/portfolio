import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AdminLayout from "../../componets/layout/adminLayout";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import CategoryList from "../../componets/categoryList";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CategoryPullDown from "../../componets/categoryPullDown";

type Props = {};

const PostList = (props: Props) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  // ブログ記事一覧をエンドポイントからaxiosにて取得
  const [post, setPost] = React.useState<{
    post: { id: number; name: string; content?: string; title?: string }[];
    pages: number;
  }>();

  // useEffectの第二引数が空のときは、画面表示した時の一度だけ処理を行う
  React.useEffect(() => {
    axios.get("/posts?&perPage=10&category=").then((response) => {
      setPost(response.data);
    });
  }, []);
  const paginate = () => {};
  // モーダル
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [category, setCategory] = React.useState<{
    categories: { name: string; id: number }[];
  }>();

  // カテゴリプルダウン
  const [selectedCategory, setSelectedCategory] = React.useState("");

  // selectedCategoryの値を更新するための関数
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // 絞り込みボタン
  const handleSearch = () => {
    axios
      .get(`/posts?&perPage=10&category=${selectedCategory}`)
      .then((response) => {
        // 指定したカテゴリのみをとりたいため、postにセットしている
        setPost(response.data);
      });
  };

  // ここで選択したカテゴリIDをselectedCategoryにセットしている
  // const handleChange = (event: SelectChangeEvent) => {
  //   setSelectedCategory(event.target.value);
  // };

  React.useEffect(() => {
    axios.get("/posts/categories/").then((response) => {
      setCategory(response.data);
    });
  }, [selectedCategory]);

  return (
    <AdminLayout>
      <Typography
        sx={{ textAlign: "center", my: 6 }}
        component="h2"
        variant="h4"
      >
        投稿一覧
      </Typography>
      <Link to={`add/`}>
        <Button variant="contained" sx={{ my: 4 }}>
          新規追加
        </Button>
      </Link>
      <Link to={`category`}>
        <Button variant="contained" sx={{ my: 4, mx: 2 }}>
          新規カテゴリ追加
        </Button>
      </Link>
      <CategoryPullDown
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
      />
      {/* 下記をCategoryPullDownコンポーネントとして切り出したためコメントアウト */}
      {/* <FormControl sx={{ my: 4, minWidth: 120, mx: 2 }} size="small">
        <InputLabel id="demo-select-small">カテゴリ名</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={selectedCategory}
          label="カテゴリ名"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>全て</em>
          </MenuItem>
          {/* valueで表示される値を設定 */}
      {/* {category?.categories?.map(
            (data: { name: string; id: number }, index: any) => {
              return <MenuItem value={data.id}>{data.name}</MenuItem>;
            }
          )}
        </Select>
      </FormControl>  */}

      <Button variant="contained" sx={{ my: 4 }} onClick={handleSearch}>
        カテゴリ絞り込み
      </Button>

      <TableContainer component={Paper} sx={{ marginBottom: 12 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>タイトル</TableCell>
              <TableCell align="right">投稿者</TableCell>
              <TableCell align="right">カテゴリ</TableCell>
              <TableCell align="right">タグ</TableCell>
              <TableCell align="right">投稿日</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {post?.post?.map((data: any, index: any) => {
              return (
                <TableRow>
                  <TableCell align="left">
                    <Link to={`/admin/posts/edit/${data.id}`}>
                      {data.title}
                    </Link>
                    <p>
                      <span>
                        <Link to={`/admin/posts/edit/${data.id}`}>
                          編集する
                        </Link>
                      </span>
                      <span>
                        <Button onClick={handleOpen}>削除する</Button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              textAlign={"center"}
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              本当に削除しますか？
                            </Typography>
                            <Box textAlign="center">
                              <Button
                                sx={{ my: 2 }}
                                variant="contained"
                                onClick={() => {
                                  axios
                                    .delete(`/posts/${data.id}`)
                                    .then((response) => {
                                      axios
                                        .get("/posts?&perPage=10&category=")
                                        .then((response) => {
                                          setPost(response.data);
                                        });
                                    });
                                }}
                              >
                                削除する
                              </Button>
                            </Box>
                          </Box>
                        </Modal>
                      </span>
                    </p>
                  </TableCell>
                  <TableCell align="right"> {data.author}</TableCell>
                  <TableCell align="right"> {data.category.name}</TableCell>
                  <TableCell align="right">
                    {/* ここでtagをmapで取り出して取得 */}
                    {data.tags.map((tag: any) => {
                      return tag.name;
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {moment(data.createdAt).format("YYYY年MM月DD日")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack>
        <Pagination
          count={post?.pages}
          onChange={paginate}
          sx={{ m: "auto", mb: 2 }}
        />
      </Stack>
    </AdminLayout>
  );
};

export default PostList;
