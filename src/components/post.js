import React from "react";
import {Link} from "react-router-dom"
const Post = ({post}) => {
    ////////////////////
    // Style Object
    ////////////////////
    const div = {
        textAlign: "center",
        border: "3px solid",
        margin: "10px auto",
        width: "80%"
    }
  return <div style={div}>
      <Link to={`/post/${post.id}`}>
          <h1>{post.title}</h1>
      </Link>
      <h2>{post.artist}</h2>
      <h3>{post.time}</h3>
  </div>;
};
export default Post;