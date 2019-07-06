import React, { useContext } from "react";
import { FETCH_POST } from "../../components/Ui/gql";
import { useQuery } from "@apollo/react-hooks";
import { Loader, Grid, Image, Card } from "semantic-ui-react";
import moment from 'moment';
import { AuthContext } from '../../components/context_auth';

// Components
import { styles } from "../../components/Ui/styles";
import LikeButton from '../home/LikeButton';
import ButtonContainer from '../../components/Ui/ButtonContainer';
import DeletePost from "../../components/Ui/DeletePost";

const SinglePage = props => {
  const postId   = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const {
    data: { getPost }
  } = useQuery(FETCH_POST, {
    variables: {
      postId
    }
  });

  console.log(getPost)

  if (!getPost) {
    return (<Loader active inline="centered" />);
  } else {
    const {
      id,
      body,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
      createdAt
    } = getPost;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
              size="small"
              floa="right"
            />
          </Grid.Column>
          <Card fluid>
              <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content>
                  <LikeButton 
                    id={id} 
                    likes={likes} 
                    likeCount={likeCount} 
                  />
                  <ButtonContainer 
                    name="comments" 
                    func={() => console.log('Comment on post')} 
                    color='blue'
                    label={commentCount}
                    positionButton='right'
                    positionLabel='left'
                    as='div'
                    />
                    {
                      user && user.username === username && (
                        <DeletePost postId={id} />
                      )
                    }
              </Card.Content>
          </Card>
        </Grid.Row>
      </Grid>
    );
  }

  return <h1>Single Page</h1>;
};

export default SinglePage;
