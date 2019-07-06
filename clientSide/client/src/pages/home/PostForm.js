import React from "react";
import { Form } from "semantic-ui-react";
import { useForm } from "../../components/Ui/hooks";
import { styles } from "../../components/Ui/styles";
import SubmitButton from "../../components/Ui/SubmitButton";
import { CREATE_POST, FETCH_POSTS_QUERY } from "../../components/Ui/gql";
import { useMutation } from "@apollo/react-hooks";

const PostForm = () => {
  const { values, updateField, submit } = useForm(createPostCallback, {
    body: ""
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data
      });
      values.body = "";
    },

    variables: values
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={submit}>
        <h1>Create a Post:</h1>
        <Form.Field>
          <Form.Input
            placeholder="create post..."
            name="body"
            onChange={updateField}
            value={values.body}
            error={error ? true : false}
          />
          <SubmitButton title="Create Post" />
        </Form.Field>
      </Form>
      {
          error && (
              <div className="ui error message">
                  <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                  </ul>
              </div>
          )
      }
    </>
  );
};

export default PostForm;
