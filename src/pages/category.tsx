import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DefaultLayout from "../componets/layout/defaultlayout";
import { Grid, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CategoryList from "../componets/categoryList";
import TagList from "../componets/tagList";
import { Link } from "react-router-dom";
import moment from "moment";
// URLは/blog/category/カテゴリID
// そのカテゴリIDの記事を取得して表示させる
// http://localhost:3000/posts?category=3 のようにカテゴリ別にバックエンドから取得可能

const Category = () => {
  type Tag = {
    id: number;
    name: string;
  };
  type Category = {
    id: number;
    name: string;
  };
  type Post = {
    id: number;
    title: string;
    description?: string;
    createdAt: number;
    category: Category;

    tags?: Tag[];
  };

  const [post, setPost] = React.useState<{ post: Post[] } | undefined>();
  console.log(post?.post);
  //   post: { id: number; name: string; category: string; tags: string[] }[]
  // idの取得
  const { id } = useParams();
  console.log(id);

  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/posts?&perPage=10&category=${id}`)
      .then((response) => {
        setPost(response.data);
      });
  }, []);
  return (
    <DefaultLayout>
      Category
      {post?.post?.map((v: any, index: any) => {
        <Grid item xs={4} key={v.id}>
          <p>{v.title}</p>
        </Grid>;
      })}
      <Grid container spacing={2} sx={{ marginTop: 8, marginBottom: 4 }}>
        {post?.post?.map((data: any, index: any) => {
          return (
            <>
              {/* <Typography>{data?.category?.name}</Typography> */}
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

                      <Typography component="span">
                        {data.tags.map((tag: any, index: any) => {
                          return tag.name;
                        })}
                      </Typography>

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
            </>
          );
        })}
      </Grid>
      <Grid container spacing={2} sx={{ marginBottom: 8 }}>
        <Grid item xs={4} sx={{ marginTop: 10 }}>
          <CategoryList />

          {/* タググループ */}
          <TagList />
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default Category;
