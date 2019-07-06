import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, GridRow, Loader } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../../components/Ui/gql";
import { styles } from "../../components/Ui/styles";

// Components
import Post from "./Post";
import { AuthContext } from '../../components/context_auth';
import PostForm from './PostForm';

const Home = () => {

  const { user } = useContext(AuthContext);

  const {
    loading,
    data: { getPosts: posts }
  } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <GridRow>
        <h1 style={styles.mainTitle}>Recent Posts</h1>
      </GridRow>
      <GridRow>
        {
          user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )
        }
      </GridRow>
      <Grid.Row>
        {loading ? (
          <Loader active inline="centered" size="big" />
        ) : (
          posts &&
          posts.map(post => (
            <Grid.Column
              key={post.id}
              style={{ marginBottom: 25 }}
              mobile={16}
              tablet={8}
              computer={5}
            >
              <Post post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
