import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import PostCard from "../components/PostCard.jsx";
import { AuthContext } from "../context/auth.js";
import PostForm from "../components/PostForm.jsx";
import { FETCH_POSTS_QUERY } from "../utils/graphql.js";

import { Grid, Transition } from 'semantic-ui-react'


const Home = () => {
  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);

  return (
    <Grid className="ui stackable two column grid">
      {user && (
        <Grid.Row className="page-title">
          <Grid.Column >
            <PostForm />
          </Grid.Column>
        </Grid.Row>
      )}

      <Grid.Row className="page-title">
        <h1>Recent Posts:</h1>
      </Grid.Row>
      <Grid.Row>
        
        {loading ? (
          <h1>Loading posts...</h1>
        ) : ( 
            <Transition.Group>
              { posts && posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
            </Transition.Group>
          )}
      </Grid.Row>
    </Grid>
  )
}

export default Home;