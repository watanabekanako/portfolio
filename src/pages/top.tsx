import DefaultLayout from "../componets/layout/defaultlayout";
import React from "react";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import axios from "axios";
import { DataArray, PostAddOutlined } from "@mui/icons-material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Popover from "@mui/material/Popover";
import moment from "moment";
import Slider from "../componets/slider";
import Paper from "@mui/material/Paper";
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
    axios.get(`http://localhost:3000/posts?perPage=3`).then((response) => {
      setCount(response.data);
    });
  }, []);

  // workのポップアップ
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  console.log("id", id);
  console.log("anchorEl?.id", anchorEl?.id);
  return (
    <DefaultLayout>
      <Slider />

      <Container sx={{ marginTop: 2 }}>
        <Box className="red">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{ my: 10, px: 2, display: "inline-block", letterSpacing: 4 }}
              component="h2"
              variant="h4"
              className="ttlUnder"
              id="about"
            >
              About
            </Typography>
          </Box>
          <Grid container spacing={10}>
            <Grid item xs={6} sx={{ zIndex: 10 }}>
              <CardMedia
                component="img"
                image="/img1.jpg"
                height="400"
                alt="about"
              />
            </Grid>
            <Grid item xs={8} sx={{ mx: -20, mt: 16 }}>
              <Paper
                sx={{ p: 10, px: 18, backgroundColor: "#e3edee", zIndex: -1 }}
              >
                <Typography
                  component="h4"
                  variant="h4"
                  sx={{ letterSpacing: 4 }}
                >
                  Watanabe
                </Typography>
                <Typography component="div" sx={{ letterSpacing: 4, mt: 2 }}>
                  岐阜県出身
                  <br />
                  フロントエンドエンジニアを目指したきっかけ： <br />
                  医療業界で働いていた経験があり、アナログな業界をITの力で、
                  良くしたいと思ったことがきっかけ。
                  <br />
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{ my: 10, px: 2, display: "inline-block", letterSpacing: 4 }}
            component="h2"
            variant="h4"
            className="ttlUnder"
            id="work"
          >
            WORK
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Button
              aria-describedby={id}
              onClick={handleClick}
              // 各々の記事にポップアップを装備するためにidの付与が必要
              id={"work-1-btn"}
            >
              <Paper elevation={3}>
                <CardMedia
                  component="img"
                  image="/img1.jpg"
                  height="400"
                  alt="ECサイト"
                />
              </Paper>
            </Button>
            <Popover
              id={"work-1-popup"}
              // openにてポップアップの表示の制御
              // anchorEl?.id にてボタンのidを取得できる
              open={anchorEl?.id === "work-1-btn"}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
            >
              <Box sx={{ m: 8 }}>
                <Typography>ECサイト</Typography>
                <Typography>Next.js/Typescriptにて作成</Typography>
                <Typography>・ECサイトの新規開発</Typography>
                <Typography>
                  ・提示された画面サンプルと機能一覧をもとに実装・テストまでの工程を担当
                </Typography>
              </Box>
            </Popover>
            <Typography component="div">ECサイト</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              aria-describedby={id}
              onClick={handleClick}
              id={"work-2-btn"}
            >
              <Paper elevation={3}>
                <CardMedia
                  component="img"
                  image="/work_1.jpg"
                  height="250"
                  alt="妊婦向けサイト"
                />
              </Paper>
            </Button>
            <Popover
              id={"work-2-popup"}
              open={anchorEl?.id === "work-2-btn"}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
            >
              <Box sx={{ m: 8 }}>
                <Typography>妊婦向けサイト</Typography>
                <Typography>Next.js/Firebase/MUIにて作成</Typography>
              </Box>
            </Popover>
            <Typography component="div">妊婦向けサイト</Typography>
        
          </Grid>
          <Grid item xs={4}>
            <Button
              aria-describedby={id}
              onClick={handleClick}
              id={"work-3-btn"}
            >
              <Paper elevation={3}>
                <CardMedia
                  component="img"
                  image="/img1.jpg"
                  height="400"
                  alt="ポートフォリオ"
                />
              </Paper>
            </Button>

            <Popover
              id={"work-3-popup"}
              open={anchorEl?.id === "work-3-btn"}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
            >
              <Box sx={{ m: 8 }}>
                <Typography>ポートフォリオ</Typography>
              </Box>
            </Popover>
            <Typography component="div">ポートフォリオ</Typography>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{ my: 10, px: 2, display: "inline-block", letterSpacing: 4 }}
            component="h2"
            variant="h4"
            className="ttlUnder"
          >
            Blog
          </Typography>
        </Box>
        {/* ブログの取り出し */}
        <Grid container spacing={2}>
          {count?.post?.map((data: any, index: any) => {
            // console.log(data.id);
            return (
              <Grid item xs={4} key={data.id}>
                <Link to={`/blog/${data.id}`}>
                  <Card sx={{ maxWidth: 345 }}>
                    {/* キャッチアップ画像 */}
                    <CardMedia
                      component="img"
                      image={data.thumbnailUrl}
                      height="300"
                      alt=""
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
                      {data?.tags.length ? (
                        <Typography
                          component="span"
                          sx={{
                            backgroundColor: "#53a4d6 ",
                            color: "#fff",
                            display: "inline-block",
                            borderRadius: "14px",
                            mr: 1,
                            px: "10px",
                            py: "4px",
                          }}
                        >
                          {data?.tags?.map((tag: any, index: any) => {
                            return tag.name;
                          })}
                        </Typography>
                      ) : undefined}
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Box textAlign="center">
        <Link to={`/blog?page=1&category=1`}>
          <Button
            sx={{ margin: 6, backgroundColor: "#53a4d6" }}
            variant="contained"
          >
            ブログ一覧はこちらから
          </Button>
        </Link>
      </Box>
    </DefaultLayout>
  );
}
export default Top;
