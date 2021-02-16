import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

import "semantic-ui-css/semantic.min.css";
import './App.css';
import { Container } from "semantic-ui-react";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

