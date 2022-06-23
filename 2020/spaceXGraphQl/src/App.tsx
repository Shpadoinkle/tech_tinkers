import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import MainPage from "./screens/MainPage";
import SharedStyles from "./sharedStyles";

const AppLayoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(7, 7, 7, 8),
      transition: theme.transitions.create(["padding"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  })
);

function App() {
  const sharedClasses = SharedStyles();
  const layoutClasses = AppLayoutStyles();

  return (
    <div className={sharedClasses.root}>
      <main className={layoutClasses.content}>
        <Router>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            {/* <Route exact path="/ship/:id">
              <Ship />
            </Route> */}
            <Redirect to="/" />
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
