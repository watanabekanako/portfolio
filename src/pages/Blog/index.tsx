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
import { Link } from "react-router-dom";
import moment from "moment";
import { useParams } from "react-router-dom";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// const baseURL = "http://localhost:3000/posts";

// ブログ一覧ページ
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BlogList() {
  const [option, setOption] = React.useState<
    | {
        option: { id: number; name: string; category: string }[];
      }
    | undefined
  >();

  console.log(option);
  // ブログ記事一覧をエンドポイントからaxiosにて取得
  const [post, setPost] = React.useState<
    | {
        post: { id: number; name: string; category: string }[];
      }
    | undefined
  >();
  console.log(post?.post);
  const [value, setValue] = React.useState(0);
  // useEffectの第二引数が空のときは、画面表示した時の一度だけ処理を行う
  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/posts?category=${value}`)
      .then((response) => {
        setPost(response.data);
      });
  }, [value]);

  React.useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((response) => {
      setOption(response.data);
    });
  }, []);

  // idの取得
  const { id } = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <DefaultLayout>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="カテゴリ1" {...a11yProps(0)} value={"category1"} />
            <Tab label="カテゴリ2" {...a11yProps(1)} value={"category2"} />
            <Tab label="カテゴリ3" {...a11yProps(2)} value={"category3"} />
          </Tabs>
        </Box>
        {/* <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel> */}
      </Box>
      <Grid container spacing={2}>
        {post?.post?.map((data: any, index: any) => {
          return (
            <Grid item xs={4} key={data.id}>
              <Link to={`${data.id}`}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    image="/logo192.png"
                    height="300"
                    alt="green iguana"
                  />
                  <CardContent>
                    <link></link>
                    <Typography component="div">
                      <Typography variant="h4">
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
                      sx={{ backgroundColor: "pink" }}
                      component="span"
                    >
                      {data?.categoryId}
                    </Typography>

                    <Typography component="span">Tag</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>

      <Grid item xs={2} sx={{ marginTop: 10 }}>
        <CategoryList />
        {/* タググループ */}
        <TagList />
      </Grid>
    </DefaultLayout>
  );
}
