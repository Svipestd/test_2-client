import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { FETCH_POSTS_QUERY } from "../utils/graphql.js";

import { Button, Form } from 'semantic-ui-react';


const PostForm = () => {
  const [values, setValues] = useState({
    body: ''
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,

    onError() { },

    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
      values.body = '';
    },

    refetchQueries: [{ query: FETCH_POSTS_QUERY }]
  })

  const onSubmit = (event) => {
    event.preventDefault();
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit} >
        <h1 className={'page-title'}>Create a post:</h1>
        
        <Form.Field>
          <Form.TextArea
            placeholder="Post text..."
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type='submit' primary>
            Create
          </Button>
        </Form.Field>
      </Form>

      {error && (
        <div className="ui error message">
          <div className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </div>
        </div>
      )}
    </>
  )
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!){
    createPost(body: $body) {
      id body createdAt username
      likes{
        id username createdAt
      }
      likeCount
      comments{
        id username body createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;