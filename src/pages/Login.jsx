import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../context/auth";

import { Form, Button, Segment } from "semantic-ui-react";


const Login = (props) => {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },

    variables: values
  })

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser();
  }

  return (
    <Segment>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </Segment>
  )
}

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String! 
  ) {
    login(
      username: $username
      password: $password
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`

export default Login;