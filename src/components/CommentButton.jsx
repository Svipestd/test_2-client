import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Icon, Label } from 'semantic-ui-react';


const CommentButton = ({ user, post: { id, commentCount } }) => {
  const commentButton = user ?
    (
      <Button basic color="blue" as={Link} to={`/posts/${id}`}>
        <Icon name="comment" />
      </Button>
    ) : (
      <Button basic color="blue" as={Link} to={`/login`}>
        <Icon name="comment" />
      </Button>
    )

  return (
    <Button as="div" labelPosition="right">
      {commentButton}
      <Label basic color="blue" pointing="left">
        {commentCount}
      </Label>
    </Button>
  )
}

export default CommentButton;