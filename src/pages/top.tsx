import DefaultLayout from "../componets/layout/defaultlayout";
import React from "react";
import { Paper } from "@mui/material";
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

const baseURL = "http://localhost:3000/test/";

function Top() {
  const [post, setPost] = React.useState<
    | {
        test: { id: number; name: string }[];
      }
    | undefined
  >();
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

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
  return (
    <DefaultLayout>
      <Container sx={{ marginTop: 2 }}>
        <Typography component="h2" variant="h4" sx={{ textAlign: "center" }}>
          About
        </Typography>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>2022</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Code</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>Sleep</TimelineContent>
          </TimelineItem>
        </Timeline>
        <Typography sx={{ textAlign: "center" }} component="h2" variant="h4">
          Blog
        </Typography>
        <Grid container spacing={2}>
          {[...Array(6)].map(() => (
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
        </Grid>{" "}
        <Button variant="contained" sx={{ margin: 8 }}>
          ブログ一覧はこちらから
        </Button>
        {/* {Object.keys(post).map((data: any, index) => {
          return (
            <li key={index} value={data.id}>
              {data.name}
            </li>
          );
        })} */}
        {post?.test?.map((data: any, index: any) => {
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
        })}
      </Container>
    </DefaultLayout>
  );
}

export default Top;
