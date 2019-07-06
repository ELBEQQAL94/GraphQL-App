import React, { useContext } from "react";
import { AuthContext } from '../../components/context_auth';

// Components
import CardContainer from '../../components/Ui/CardContainer';

const Post = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) => (

   <CardContainer
     likes={likes}
     body={body}
     createdAt={createdAt}
     id={id}
     username={username}
     likeCount={likeCount}
     commentCount={commentCount}
   />
   
);

export default Post;
