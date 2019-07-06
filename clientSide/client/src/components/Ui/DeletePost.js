import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_POST } from "../Ui/gql";
import { Button, Icon ,Confirm } from "semantic-ui-react";

const DeletePost = ({ postId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    update() {
        setConfirmOpen(false);
        // TODO: remove post from cache
    },
    variables: {
      postId
    },
    onError(err) {
      console.log(err);
    }
  });
  return (
    <>
      <Button
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" />
      </Button>

      <Confirm 
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
        />
    </>
  );
};

export default DeletePost;
