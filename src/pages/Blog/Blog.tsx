import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DefaultLayout from "../../componets/layout/defaultlayout";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import CategoryList from "../../componets/categoryList";
import moment from "moment";
import TagList from "../../componets/tagList";
function Blog() {
  const [post, setPost] = React.useState<
    | {
        post: {
          id: number;
          title: string;
          description: string;
          createdAt: number;
          category: { id: number; name: string };
          tags: { id: number; name: string }[];
        };
      }
    | undefined
  >();
  React.useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((response) => {
      setPost(response.data);
    });
  }, []);

  // idの取得
  const { id } = useParams();
  console.log(id);
  //   その取得したIDをURLのに入れる→投稿データ取得できる
  console.log(post?.post.title);

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
              {/* カテゴリの表示 */}
              {post?.post.category.name}
            </Typography>

            {/*タグの表示 */}
            {post?.post.tags.map((data) => (
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
                {data.name}
              </Typography>
            ))}

            <Box textAlign="right">
              <Typography component="p">
                {moment(post?.post.createdAt).format("YYYY/MM/DD")}
              </Typography>
            </Box>
            <Paper sx={{ marginTop: 1, padding: 2 }}>タイトル</Paper>

            <Paper sx={{ marginTop: 6, padding: 2 }}>
              <div>ユーザーID： {id}です </div>
              {post?.post.title}
              {post?.post.description}
            </Paper>
            <Box textAlign="center">
              <Button
                sx={{ marginTop: 6, backgroundColor: "#fedcac" }}
                variant="contained"
              >
                一覧へ戻る
              </Button>
              {/* /* <ButtonOrange /> */}
            </Box>
          </Grid>
          <Grid item xs={1} sx={{ marginTop: 10 }}></Grid>
          <Grid item xs={2} sx={{ marginTop: 10 }}>
            {/* カテゴリグループ */}
            <CategoryList />
            {/* タググループ */}
            <TagList />
          </Grid>
        </Grid>
      </Box>
    </DefaultLayout>
  );
}

export default Blog;
