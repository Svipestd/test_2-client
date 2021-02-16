import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { FETCH_POSTS_QUERY } from '../utils/graphql';

import { Button, Icon, Confirm } from 'semantic-ui-react';


const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    update() {
      if (callback) callback();
    },
    variables: { postId, commentId },
    refetchQueries: [{ query: FETCH_POSTS_QUERY }]
  });

  return (
    <>
      <Button as='div' color='red' floated="right" onClick={() => setConfirmOpen(true)}>
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>

      <Confirm
        open={confirmOpen}
        onCancel={() => { setConfirmOpen(false) }}
        onConfirm={deletePostOrComment} />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!){
    deleteComment(postId: $postId, commentId: $commentId){
      id
      commentCount
      comments{
        id body username createdAt
      }
    }
  }
`;

export default DeleteButton;