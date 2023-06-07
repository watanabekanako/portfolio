import axios from "axios";
import React, { useEffect, useState } from "react";
type Props = {
  postId: number;
};
const useGetAnPost = (props: Props) => {
  const [post, setPost] = useState<any>();

  useEffect(() => {
    if (!props.postId) return;
    axios
      .get(`/posts/${props.postId}`)
      .then((response) => {
        setPost(response.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.postId]);
  return { post };
};

export default useGetAnPost;
