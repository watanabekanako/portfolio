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
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

function Blog() {
  const [post, setPost] = React.useState<
    | {
        post: {
          id: number;
          title: string;
          description: string;
          createdAt: number;
          content: string;
          category: { id: number; name: string };
          tags: { id: number; name: string }[];
        };
      }
    | undefined
  >();
  const [category, setCategory] = React.useState<
    | {
        post: {
          id: number;
          title: string;
          content: string;
          description: string;
          createdAt: number;
          category: { id: number; name: string };
          tags: { id: number; name: string }[];
        }[];
      }
    | undefined
  >();

  React.useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((response) => {
      setPost(response.data);
    });
    // 依存配列にpost入れていると無限ループ
  }, []);

  console.log("ぽすと", post?.post);
  // React.useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/posts?category=${post?.post?.category.id}`)
  //     .then((response) => {
  //       setCategory(response.data);
  //     });
  // }, []);
  React.useEffect(() => {
    if (post?.post?.category.id) {
      axios
        .get(
          `http://localhost:3000/posts?category=${post?.post?.category.id}&&perPage=3`
        )
        .then((response) => {
          setCategory(response.data);
        });
    }
  }, [post]);
  console.log("かてごり", category?.post);
  console.log("id", post?.post?.category.id);
  // idの取得
  const { id } = useParams();
  console.log("id", id);
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
                backgroundColor: "#f2809e",
                display: "inline-block",
                borderRadius: "16px",
                color: "#fff",
                marginRight: 2,
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
                  backgroundColor: "#53a4d6 ",
                  color: "#fff",
                  display: "inline-block",
                  borderRadius: "14px",
                  mr: 2,
                  px: "10px",
                  py: "4px",
                }}
              >
                {data.name}
              </Typography>
            ))}

            <Box textAlign="right">
              <Typography component="p">
                {moment(post?.post.createdAt).format("YYYY年MM月DD日")}
              </Typography>
            </Box>
            <Paper sx={{ marginTop: 1, padding: 2 }}>{post?.post.title}</Paper>

            <Paper sx={{ marginTop: 6, padding: 2 }}>
              {/* <div>ユーザーID： {id}です </div> */}
              {post?.post.content}
            </Paper>
            <Box textAlign="center" sx={{ mb: 8 }}>
              <Link to={`/blog?page=1&category=1`}>
                <Button
                  sx={{ marginTop: 6, backgroundColor: "#53a4d6" }}
                  variant="contained"
                >
                  一覧へ戻る
                </Button>
              </Link>
            </Box>
            <Typography sx={{ my: 3 }}>あわせて読みたい!</Typography>
            <Grid container spacing={2} sx={{ mb: 8 }}>
              {category?.post?.map((data: any, index: any) => (
                <Grid item xs={4} key={data.id}>
                  <Link to={`/blog/${data.id}`}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component="img"
                        image={data.thumbnailUrl}
                        height="300"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {data.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {data.description}
                        </Typography>
                        <Typography
                          sx={{
                            padding: "6px",
                            backgroundColor: "#f2809e",
                            display: "inline-block",
                            borderRadius: "16px",
                            color: "#fff",
                            marginRight: 2,
                            mb: 1,
                          }}
                          component="span"
                        >
                          {data?.category?.name}
                        </Typography>
                        {data.tags.map((tag: any, index: any) => {
                          return (
                            <Typography
                              component="span"
                              sx={{
                                backgroundColor: "#53a4d6 ",
                                color: "#fff",
                                display: "inline-block",
                                borderRadius: "14px",
                                mr: 1,
                                mb: 1,
                                px: "10px",
                                py: "4px",
                              }}
                            >
                              {tag.name}
                            </Typography>
                          );
                        })}

                        <Typography component="div">
                          <Typography
                            variant="h6"
                            sx={{ color: "#888", textAlign: "right" }}
                          >
                            {moment(data.createdAt).format("YYYY年MM月DD日")}
                          </Typography>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={1} sx={{ marginTop: 10 }}></Grid>
          <Grid item xs={2} sx={{ marginTop: 10 }}>
            {/* カテゴリグループ */}
            <CategoryList />
            {/* タググループ */}
            <TagList />
          </Grid>
        </Grid>

        {/* http://localhost:3000/posts?category=1 のようなエンドポイントにて取得　idはカテゴリidから取得 */}
      </Box>
    </DefaultLayout>
  );
}

export default Blog;
