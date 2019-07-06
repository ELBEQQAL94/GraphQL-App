import React, { useContext } from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { likePost, commentOnPost } from "../post_actions";
import { AuthContext } from "../../components/context_auth";

// Components
import ButtonContainer from "./ButtonContainer";
import LikeButton from "../../pages/home/LikeButton";
import DeletePost from '../../components/Ui/DeletePost';

const CardCountainer = ({
  username,
  createdAt,
  id,
  body,
  likeCount,
  commentCount,
  likes
}) => {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          <span className="date">{moment(createdAt).fromNow(true)}</span>
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton id={id} likeCount={likeCount} likes={likes} />

        <ButtonContainer
          positionButton="right"
          color="blue"
          name="comments"
          positionLabel="left"
          label={commentCount}
          func={commentOnPost}
          as={Link}
          to={`/posts/${id}`}
        />
        {user && user.username === username && (
          <DeletePost postId={id} />
        )}
      </Card.Content>
    </Card>
  );
};

export default CardCountainer;
