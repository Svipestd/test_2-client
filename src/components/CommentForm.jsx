import React, { useRef, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { Card, Form } from 'semantic-ui-react';


const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const commentInputRef = useRef(null);

  const [createComment, { error }] = useMutation(CREATE_COMMENT, {
    variables: {
      postId,
      body: comment
    },

    update() {
      setComment('');
      commentInputRef.current.blur();
    },

    onError() { }
  })

  return (
    <>
      <Card fluid>
        <Card.Content>
          <p>Post a comment</p>
          <Form>
            <div className="ui action input fluid">
              <input
                type="text"
                placeholder="Comment..."
                name="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                ref={commentInputRef}
              />
              <button
                type="submit"
                className="ui button primary"
                disabled={comment.trim() === ''}
                onClick={createComment}
              >Create</button>
            </div>
          </Form>
        </Card.Content>
      </Card>

      {
        error && (
          <div className="ui error message">
            <div className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </div>
          </div>
        )
      }
    </>
  )
}

const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $body: String!){
    createComment(postId: $postId, body: $body){
      id
      commentCount
      comments{
        id body username createdAt
      }
    }
  }
`;

export default CommentForm;