import React from 'react';
import ReactDOM from 'react-dom';
import ApolloProvider from "./ApolloProvider";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <div>
    {ApolloProvider}
  </div>,
  document.getElementById('root')
);

reportWebVitals();
