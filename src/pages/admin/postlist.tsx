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
const PostList = () => {
  // ブログ記事一覧をエンドポイントからaxiosにて取得
  const [post, setPost] = React.useState<
    | {
        post: { id: number; name: string }[];
      }
    | undefined
  >();
  // useEffectの第二引数が空のときは、画面表示した時の一度だけ処理を行う
  React.useEffect(() => {
    axios.get("http://localhost:3000/posts").then((response) => {
      setPost(response.data);
    });
  }, []);

  const [value, setValue] = React.useState(0);

  return (
    <DefaultLayout>
      {/* 記事の新規追加ボタン */}
      {/* カテゴリ検索プルダウン */}
      {/* 日付検索プルダウン */}

      {/* 検索機能 */}

      <TableContainer component={Paper}>
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
            {post?.post?.map((data: any, index: any) => (
              <TableRow>
                <TableCell align="left">
                  <Link to={`${data.id}`}>
                    {data.title}
                    {data.id}
                  </Link>
                  <p>
                    <span>
                      <Link to={`${data.id}`}>編集する</Link>
                    </span>
                    <span>削除する</span>
                  </p>
                </TableCell>
                <TableCell align="right"> {data.author}</TableCell>
                <TableCell align="right"> {data.categoryId}</TableCell>
                <TableCell align="right"> {data.categoryId}</TableCell>
                <TableCell align="right"> {data.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DefaultLayout>
  );
};

export default PostList;
