import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider as MobxProvider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import client from "./apollo";
import App from "./App";
import "./index.css";
import userStore from "./mobx/user";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MobxProvider userStore={userStore}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </MobxProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
