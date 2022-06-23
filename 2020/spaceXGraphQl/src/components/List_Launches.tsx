import { Divider, Grid, Hidden, Paper, Typography } from "@material-ui/core";
import moment from "moment";
import React, { FunctionComponent } from "react";
import SharedStyles from "../sharedStyles";

const ListShip: FunctionComponent<any> = ({ launch = {} }) => {
  const sharedClasses = SharedStyles();

  return (
    <Grid item xs={12}>
      <Paper className={sharedClasses.paper}>
        <Grid container direction="row" justify="space-between" spacing={2}>
          <Grid
            container
            item
            justify="flex-start"
            alignContent="flex-start"
            spacing={1}
            xs={12}
            sm={8}
          >
            <Grid container item direction="row" xs={12}>
              <Typography color="primary">Mission Name:&nbsp;</Typography>
              <Typography color="secondary">{` ${launch.mission_name}`}</Typography>
            </Grid>
            <Grid container item direction="row" xs={12}>
              <Typography color="primary">Launch Date:&nbsp;</Typography>
              <Typography color="secondary">{` ${moment(
                launch.launch_date_utc
              ).format("hh:mma DD/MM/YYYY")}`}</Typography>
            </Grid>
            <Grid container item direction="row" xs={12}>
              <Typography color="primary">Rocket Used:&nbsp;</Typography>
              <Typography color="secondary">{` ${launch.rocket.rocket_name}`}</Typography>
            </Grid>
          </Grid>
          <Hidden xsDown>
            <Divider orientation="vertical" flexItem />
          </Hidden>
          <Grid
            container
            item
            justify="center"
            alignContent="center"
            spacing={1}
            xs={12}
            sm={4}
          >
            <Grid
              container
              item
              direction="row"
              justify="center"
              alignContent="center"
              xs={12}
            >
              <Typography color="primary">Successful:&nbsp;</Typography>
              <Typography color="secondary">{`${
                launch.launch_success ? "Yes" : "No"
              }`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ListShip;
