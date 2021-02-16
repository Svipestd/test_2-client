import React, { useContext } from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import CommentButton from './CommentButton';

import { Card, Image } from 'semantic-ui-react';


const PostCard = ({ post: { body, username, id, createdAt, likes, likeCount, commentCount } }) => {
  const { user } = useContext(AuthContext);

  const cardContent = user ? (
    <Card.Content as={Link} to={`/posts/${id}`}>
      <Image
        floated='right'
        size='mini'
        src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
      />
      <Card.Header>{username}</Card.Header>
      <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
      <Card.Description>{body}</Card.Description>
    </Card.Content>
  ) : (
      <Card.Content as={Link} to={'/login'}>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta >{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
    )

  return (
    <Card fluid>
      {cardContent}
      <Card.Content extra >
        <LikeButton post={{ id, likes, likeCount }} user={user} />
        <CommentButton post={{ id, commentCount }} user={user} />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  )
}

export default PostCard;