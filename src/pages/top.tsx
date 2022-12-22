import DefaultLayout from "../componets/layout/defaultlayout";
import React from "react";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import axios from "axios";
import { DataArray, PostAddOutlined } from "@mui/icons-material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import moment from "moment";
import Slider from "../componets/slider";
const baseURL = "http://localhost:3000/test/";
const postURL = "http://localhost:3000/posts/";
function Top() {
  // const [post, setPost] = React.useState<
  //   | {
  //       test: { id: number; name: string }[];
  //     }
  //   | undefined
  // >();
  // React.useEffect(() => {
  //   axios.get(baseURL).then((response) => {
  //     setPost(response.data);
  //   });
  // }, []);

  const [post, setPost] = React.useState<
    | {
        post: { id: number; name: string; category: string; tags: string[] }[];
      }
    | undefined
  >();
  console.log(post?.post);

  // useEffectの第二引数が空のときは、画面表示した時の一度だけ処理を行う
  React.useEffect(() => {
    axios.get(`http://localhost:3000/posts`).then((response) => {
      setPost(response.data);
    });
  }, []);
  console.log(post);
  // console.log(post?.test[0].name);
  const [nameText, setNameText] = React.useState<string | undefined>();

  const [updateNameText, setUpdateNameText] = React.useState<
    string | undefined
  >(nameText);
  // 更新するボタン
  const onChangeNameText = (event: any) => {
    setUpdateNameText(event.target.value);
  };
  console.log(nameText);
  // 保存するボタン
  const onClickCreate = () => {
    axios
      .post("http://localhost:3000/test/", { name: nameText })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(updateNameText);
  const postCount = 3;
  const [count, setCount] = React.useState<
    | {
        post: { id: number; name: string; category: string; tags: string[] }[];
      }
    | undefined
  >();
  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/posts?count=${postCount}`)
      .then((response) => {
        setCount(response.data);
      });
  }, []);
  console.log("かうんと", post);
  console.log("かうんと", count);
  return (
    <DefaultLayout>
      <Slider />

      <Container sx={{ marginTop: 2 }}>
        <Box className="red">
          <Typography
            component="h2"
            variant="h4"
            sx={{ textAlign: "center", margin: 4 }}
          >
            About
          </Typography>
          <Grid container spacing={10}>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                image="/img1.jpg"
                height="300"
                alt="green iguana"
              />
            </Grid>
            <Grid item xs={6}>
              テキストテキストテキストテキストテキストテキストテキストテキストテキスト
              テキストテキストテキストテキストテキストテキストテキストテキストテキスト
              テキストテキストテキストテキストテキストテキストテキストテキストテキスト
            </Grid>
          </Grid>
        </Box>
        <Typography
          sx={{ textAlign: "center", marginBottom: 4 }}
          component="h2"
          variant="h4"
        >
          WORKS
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                image="/logo192.png"
                height="300"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  ECサイト
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                image="/logo192.png"
                height="300"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  妊婦向けサイト
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                image="/logo192.png"
                height="300"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  ポートフォリオ
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Typography
          sx={{ textAlign: "center", marginBottom: 4 }}
          component="h2"
          variant="h4"
        >
          Blog
        </Typography>
        {/* <Grid container spacing={2}>
          {[...Array(3)].map(() => (
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  image="/logo192.png"
                  height="300"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    title
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> */}

        {/* ブログの取り出し */}
        <Grid container spacing={2}>
          {count?.post?.map((data: any, index: any) => {
            // console.log(data.id);

            return (
              <Grid item xs={4} key={data.id}>
                <Link to={`/blog/${data.id}`}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      image="/img1.jpg"
                      height="300"
                      alt="green iguana"
                    />
                    <CardContent>
                      <link></link>
                      <Typography component="div">
                        <Typography variant="h6">
                          {moment(data.createdAt).format("YYYY/MM/DD")}
                        </Typography>
                      </Typography>
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
                        }}
                        component="span"
                      >
                        {data?.category?.name}
                      </Typography>
                      {data?.tags?.name}

                      <Typography component="span">Tag</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>

        {/* {Object.keys(post).map((data: any, index) => {
          return (
            <li key={index} value={data.id}>
              {data.name}
            </li>
          );
        })} */}
        {/* {post?.test?.map((data: any, index: any) => {
          return (
            <li key={index} value={data.id}>
              {data.id}
              {data.name}
              <input
                type="text"
                value={updateNameText}
                onChange={onChangeNameText}
              />

              <button
                onClick={() =>
                  axios
                    .delete(`http://localhost:3000/test/${data.id}`, {
                      params: {
                        id: data.id,
                        name: data.body,
                      },
                    })
                    .then(() => {
                      console.log("削除ID", baseURL);
                    })
                    .catch((err) => {
                      console.log("err,err");
                    })
                }
              >
                削除する
              </button>
              <button
                onClick={() =>
                  axios.put(`http://localhost:3000/test/${data.id}`, {
                    id: data.id,
                    name: updateNameText,
                  })
                }
              >
                更新する
              </button>
            </li>
          );
        })} */}
      </Container>
      <Box textAlign="center">
        <Link to={`/blog`}>
          <Button variant="contained" sx={{ margin: 8 }}>
            ブログ一覧はこちらから
          </Button>
        </Link>
      </Box>
    </DefaultLayout>
  );
}

export default Top;
