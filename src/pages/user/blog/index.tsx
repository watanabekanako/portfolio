import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import axios from "axios";
import CategoryList from "../../../componets/categoryList";
import TagList from "../../../componets/tagList";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { Post, Tag } from "../../../types/type";
import CategoryTabs from "../../../features/categoryTabs";
// ブログ一覧ページ
function a11yProps(id: number) {
  return {
    id: `simple-tab-${id}`,
    "aria-controls": `simple-tabpanel-${id}`,
  };
}
// カテゴリタブ
const BlogList = () => {
  // The above error occurred in the <BlogList> componentのエラーが下記を記述にて出現:
  // const location = useLocation();
  // const { id } = location.state;
  // console.log(location, "location");
  // ブログ記事一覧をエンドポイントからaxiosにて取得
  const [post, setPost] = React.useState<
    | {
        post: Post[];
        totalCount: number;
        pages: number;
      }
    | undefined
  >();
  // post?.post?.lengthで記事の数を出力
  const [searchParams, setSearchParams] = useSearchParams();
  // 初期値
  const page = searchParams.get("page");
  console.log(searchParams.get("page"), "searchParams");
  React.useEffect(() => {
    axios
      // 下記URLのcategoryにカテゴリidが入る
      // null合体演算子での判定
      .get(
        `/posts?page=${searchParams.get("page") ?? "1"}&perPage=10&category=${
          searchParams.get("category") ?? ""
        }`
      )
      .then((response) => {
        setPost(response.data);
      });
  }, [searchParams.get("page"), searchParams.get("category")]);

  const navigate = useNavigate();
  const [categoryName, setCategoryName] = React.useState<
    | {
        id: number;
        name: string;
      }[]
    | undefined
  >();
  const pageChange = (event: any, value: number) => {
    navigate(`/blog?page=${value}&category=${searchParams.get("category")}`);
  };
  React.useEffect(() => {
    axios.get(`/posts/categories`).then((response) => {
      setCategoryName(response.data.categories);
    });
  }, []);

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   // urlのセット
  //   navigate(`/blog?page=1&category=${newValue}`);
  // };
  const handleChange = (newValue: string) => {
    navigate(`/blog?page=1&category=${newValue}`);
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            marginBottom: 6,
            marginTop: 6,
          }}
        >
          {/* MUI: The `value` provided to the Tabs component is invalid. */}
          {/* None of the Tabs' children match with "null". */}
          <CategoryTabs
            categoryName={categoryName}
            searchParams={searchParams}
            onChange={handleChange}
          />
          {/* <Tabs
            value={searchParams.get("category") || ""}
            onChange={handleChange}
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
            {categoryName?.map((data: { name: string; id: number }) => {
              return (
                // フラグメントの削除にてタブの挙動正常化
                // 下記コンポーネントは直下に置かないと動かない
                <Tab
                  key={data.id}
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
          </Tabs> */}
        </Box>
      </Box>

      <Grid container spacing={2}>
        {post?.post?.map((data: Post, index: any) => {
          return (
            <Grid item xs={4} key={data.id}>
              <Link to={`${data.id}`}>
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
                      }}
                      component="span"
                    >
                      {data?.category?.name}
                    </Typography>
                    {/* タグがない場合は非表示にする制御 */}
                    {data.tags?.length ? (
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
                        {data.tags.map((tag: Tag) => {
                          return (
                            <Typography
                              key={data.id}
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
          page={Number(searchParams.get("page"))}
          sx={{ m: "auto", mt: 4 }}
        />
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ marginTop: 10 }}>
          <CategoryList />

          {/* タググループ */}
          <TagList />
        </Grid>
      </Grid>
    </>
  );
};
export default BlogList;
