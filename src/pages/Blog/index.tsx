import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DefaultLayout from "../../componets/layout/defaultlayout";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import axios from "axios";
import CategoryList from "../../componets/categoryList";
import TagList from "../../componets/tagList";
import { Link, useSearchParams } from "react-router-dom";
import moment from "moment";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { WifiPassword } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// ブログ一覧ページ
// カテゴリタブ
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function BlogList() {
  // http://localhost:3001/blog?page=1 これでページング１ページ目の取得
  // http://localhost:3001/blog?page=2 これでページングの2ページ目の取得

  // ブログ記事一覧をエンドポイントからaxiosにて取得
  const [post, setPost] = React.useState<
    | {
        post: { id: number; name: string; category: string; tags: string[] }[];
        totalCount: number;
        pages: number;
      }
    | undefined
  >();
  // post?.post?.lengthで記事の数を出力
  console.log("post.pages", post?.pages);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  console.log("page", page);

  const navigate = useNavigate();
  const [paginate, setPaginate] = React.useState(page);
  const [category, setCategory] = React.useState("");

  const pageChange = (event: any, value: any) => {
    navigate(`/blog?page=${value}&category=${category}`);
    setCategory(category);
    setPaginate(value);
  };

  console.log("category", category);
  React.useEffect(() => {
    axios
      // 下記URLのcategoryにカテゴリidが入る
      .get(
        `http://localhost:3000/posts?page=${paginate}&perPage=10&category=${category}`
      )
      .then((response) => {
        setPost(response.data);
      });
  }, [category, paginate]);

  // idの取得
  const { id } = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    // urlのセット
    navigate(`/blog?page=1&category=${category}`);
    // データ取得のセット
    setCategory(newValue);
    setPaginate(String(1));
  };
  // tabにて選択したカテゴリ名取れている
  console.log("カテゴリの値", category);

  return (
    <DefaultLayout>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            marginBottom: 6,
            marginTop: 6,
          }}
        >
          <Tabs
            value={category}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="All"
              {...a11yProps(0)}
              value={""}
              sx={{
                backgroundColor: "rgba(189, 189, 189, 0.17)",
                marginRight: 2,
              }}
            />
            <Tab
              label="カテゴリ1"
              {...a11yProps(1)}
              value={"1"}
              sx={{
                backgroundColor: "rgba(189, 189, 189, 0.17)",
                marginRight: 2,
              }}
            />
            <Tab
              label="カテゴリ2"
              {...a11yProps(2)}
              value={"2"}
              sx={{
                backgroundColor: "rgba(189, 189, 189, 0.17)",
                marginRight: 2,
              }}
            />
            <Tab
              label="カテゴリ3"
              {...a11yProps(3)}
              value={"3"}
              sx={{
                backgroundColor: "rgba(189, 189, 189, 0.17)",
                marginRight: 2,
              }}
            />
          </Tabs>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {post?.post?.map((data: any, index: any) => {
          return (
            <Grid item xs={4} key={data.id}>
              <Link to={`${data.id}`}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    image="/img1.jpg"
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
                      }}
                      component="span"
                    >
                      {data?.category?.name}
                    </Typography>
                    {/* タグがない場合は非表示にする制御 */}
                    {data.tags.length ? (
                      <Typography
                        component="p"
                        sx={{
                          padding: "6px",
                          backgroundColor: "#f2809e",
                          display: "inline-block",
                          borderRadius: "16px",
                          color: "#fff",
                          marginRight: 2,
                        }}
                      >
                        {data.tags.map((tag: any, index: any) => {
                          return tag.name;
                        })}
                      </Typography>
                    ) : null}
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
          );
        })}
      </Grid>
      {/* ページング機能 */}
      <Stack spacing={2}>
        <Pagination
          // 総ページ数
          count={post?.pages}
          // page={post?.totalCount}
          onChange={pageChange}
          page={Number(paginate)}
        />
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ marginTop: 10 }}>
          <CategoryList />

          {/* タググループ */}
          <TagList />
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}
