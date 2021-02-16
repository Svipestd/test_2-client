import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import CommentButton from '../components/CommentButton';
import CommentForm from '../components/CommentForm';

import { Card, Grid, Image, Transition } from 'semantic-ui-react';


const SinglePost = (props) => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const { loading, data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: { postId }
  });

  const deletePostCallback = () => {
    props.history.push("/");
  }

  let postMarkup;
  if (loading) {
    postMarkup = <p>Loading post...</p>;

  } else {
    const { id, body, username, createdAt, likeCount, likes, commentCount, comments } = getPost;

    postMarkup = (
      <Grid className={'ui stackable two column grid'}>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
              size="small"
              float="right" />
          </Grid.Column>

          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <CommentButton post={{ id, commentCount }} />
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>

            <CommentForm postId={id} />
            
            <Transition.Group>
              {comments.map(comment => (
                <Card key={comment.id} fluid>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Transition.Group>
          </Grid.Column>

        </Grid.Row>
      </Grid >
    )
  }
  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!){
    getPost(postId: $postId){
      id
      body
      username
      createdAt
      likeCount
      likes {
        username
      }
      commentCount
      comments{
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;