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
import { useNavigate } from "react-router-dom";

// ブログ一覧ページ
// カテゴリタブ
function a11yProps(id: number) {
  return {
    id: `simple-tab-${id}`,
    "aria-controls": `simple-tabpanel-${id}`,
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
  // 初期値
  const page = searchParams.get("page");
  console.log("page", page);

  const navigate = useNavigate();
  const [paginate, setPaginate] = React.useState(page);
  const [categoryId, setCategoryId] = React.useState("");
  const [categoryName, setCategoryName] = React.useState<
    | {
        id: number;
        name: string;
      }[]
    | undefined
  >();
  console.log("categoryName", categoryName);
  const pageChange = (event: any, value: any) => {
    navigate(`/blog?page=${value}&category=${categoryId}`);
    setCategoryId(categoryId);
    setPaginate(value);
  };

  React.useEffect(() => {
    axios
      // 下記URLのcategoryにカテゴリidが入る
      .get(
        `http://localhost:3000/posts?page=${
          paginate ?? "1"
        }&perPage=10&category=${categoryId}`
      )
      .then((response) => {
        setPost(response.data);
      });
  }, [categoryId, paginate]);

  React.useEffect(() => {
    axios.get(`http://localhost:3000/posts/categories`).then((response) => {
      setCategoryName(response.data.categories);
      console.log("response", response.data);
    });
  }, []);

  // idの取得
  const { id } = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log("newValue", newValue);
    // urlのセット
    navigate(`/blog?page=1&category=${categoryId}`);
    // データ取得のセット
    setCategoryId(newValue);
    setPaginate(String(1));
  };
  // tabにて選択したカテゴリ名取れている
  console.log("カテゴリのID", categoryId);

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
            value={categoryId}
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
            {categoryName?.map((data: any) => {
              console.log("data.id", data.id);
              return (
                // フラグメントの削除にてタブの挙動正常化
                // 下記コンポーネントは直下に置かないと動かない
                <Tab
                  label={data.name}
                  {...a11yProps(data.id)}
                  value={String(data.id)}
                  sx={{
                    backgroundColor: "rgba(189, 189, 189, 0.17)",
                    marginRight: 2,
                  }}
                />
              );
            })}

            <Tab
              label="travel"
              // {...a11yProps(2)}
              value={"2"}
              sx={{
                backgroundColor: "rgba(189, 189, 189, 0.17)",
                marginRight: 2,
              }}
            />
            <Tab
              label="hobby"
              // {...a11yProps(3)}
              value={"1"}
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
                          backgroundColor: "yellows",
                          display: "inline-block",
                          borderRadius: "16px",
                          color: "#fff",
                          marginRight: 2,
                        }}
                      >
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
                                px: "10px",
                                py: "4px",
                              }}
                            >
                              {tag.name}
                            </Typography>
                          );
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
          sx={{ m: "auto" }}
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
