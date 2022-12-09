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
import { PostAddOutlined } from "@mui/icons-material";
const baseURL = "http://localhost:3000/test/";

function Top() {
  // const [post, setPost] = React.useState([]);
  const [post, setPost] = React.useState<
    | {
        test: { id: number; name: string }[];
      }
    | undefined
  >();
  React.useEffect(() => {
    // get
    // axios.get(baseURL).then((response) => {
    //   setPost(response.data);
    // });
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  console.log(post);
  // console.log(post?.test[0].name);
  const [nameText, setNameText] = React.useState<
    | {
        test: { id: number; name: string }[];
      }
    | undefined
  >();
  React;
  const onChangeNameText = (event: any) => {
    setNameText(event.target.value);
  };

  // 保存するボタン
  const onClickCreate = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/test/",
      data: {
        name: nameText,
      },
    });
  };

  return (
    <DefaultLayout>
      <React.Fragment>
        <Typography variant="h2">Blog</Typography>

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
        <Typography variant="h2">Blog</Typography>
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
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
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
              {data.name}
            </li>
          );
        })}
        <div>
          <input
            type="text"
            name="name"
            value={nameText}
            onChange={onChangeNameText}
          />
        </div>
        <button onClick={() => onClickCreate()}>保存する</button>
      </React.Fragment>
    </DefaultLayout>
  );
}

export default Top;
