import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DefaultLayout from "../../componets/layout/defaultlayout";
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
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/system";
const PostList = () => {
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
  const [post, setPost] = React.useState<
    | {
        post: { id: number; name: string }[];
        pages: number;
      }
    | undefined
  >();

  // useEffectの第二引数が空のときは、画面表示した時の一度だけ処理を行う
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/posts?&perPage=10&category=")
      .then((response) => {
        setPost(response.data);
      });
  }, []);

  const [value, setValue] = React.useState(0);
  const paginate = () => {};
  // モーダル
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <DefaultLayout>
      {/* 記事の新規追加ボタン */}
      {/* カテゴリ検索プルダウン */}
      {/* 日付検索プルダウン */}

      {/* 検索機能 */}
      <Typography>ブログ投稿一覧</Typography>
      <Link to={`posts/add/`}>
        <Button variant="contained" sx={{ my: 4 }}>
          新規追加
        </Button>
      </Link>
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
              console.log("data", data);
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
                      <Button
                        onClick={() => {
                          axios
                            .delete(`http://localhost:3000/posts/${data.id}`)
                            .then((response) => {
                              axios
                                .get(
                                  "http://localhost:3000/posts?&perPage=10&category="
                                )
                                .then((response) => {
                                  setPost(response.data);
                                });
                            });
                        }}
                      >
                        削除する
                      </Button>
                    </p>
                    <div>
                      <Button onClick={handleOpen}>削除する２</Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            削除しますか？
                          </Typography>
                          <Button
                            onClick={() => {
                              axios
                                .delete(
                                  `http://localhost:3000/posts/${data.id}`
                                )
                                .then((response) => {
                                  axios
                                    .get(
                                      "http://localhost:3000/posts?&perPage=10&category="
                                    )
                                    .then((response) => {
                                      setPost(response.data);
                                    });
                                });
                            }}
                          >
                            削除する
                          </Button>
                        </Box>
                      </Modal>
                    </div>
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
    </DefaultLayout>
  );
};

export default PostList;
