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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// const baseURL = "http://localhost:3000/posts";
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BlogList() {
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
  // console.log(post);

  const [value, setValue] = React.useState(0);

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
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
      {post?.post?.map((data: any, index: any) => {
        return (
          <>
            <li key={index} value={data.id}>
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
                      <Typography component="div">{data.createdAt}</Typography>
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
                        {data.categoryId}
                      </Typography>

                      <Typography component="span">Tag</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </li>
          </>
        );
      })}

      <Grid item xs={2} sx={{ marginTop: 10 }}>
        <CategoryList />
        {/* タググループ */}

        <Typography
          sx={{ marginTop: 4, borderBottom: 1, borderColor: "yellow" }}
        >
          Tag
        </Typography>
        <Typography>Food(12)</Typography>
        <Typography>Travel(10)</Typography>
        <Typography>Game(10)</Typography>
      </Grid>
    </DefaultLayout>
  );
}
