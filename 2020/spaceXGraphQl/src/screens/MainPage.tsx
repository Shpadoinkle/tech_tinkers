import { Grid, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import NextLaunch from "../components/NextLaunch";
import PreviousLaunches from "../components/PreviousLaunches";
import Rockets from "../components/Rockets";

const MainPage: FunctionComponent = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      //   alignItems="center"
      //   justify="center"
    >
      <Grid item xs={12}>
        <Typography variant="h3" color="secondary">
          Space X Api
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} md={7} lg={7} xl={7} sm={7}>
            <Rockets />
          </Grid>
          <Grid item xs={12} md={5} lg={5} xl={5} sm={5}>
            <NextLaunch />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <PreviousLaunches />
      </Grid>
    </Grid>
  );
};

export default MainPage;
