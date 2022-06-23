import { gql, useQuery } from "@apollo/client";
import { Grid, Paper, Typography } from "@material-ui/core";
import moment from "moment";
import React, { FunctionComponent } from "react";
import SharedStyles from "../sharedStyles";

const GET_NEXT_LAUNCH = gql`
  query NextLaunch {
    launchNext {
      rocket {
        rocket_name
        rocket {
          id
        }
      }
      mission_name
      launch_date_utc
      details
    }
  }
`;

const MainPage: FunctionComponent = () => {
  const sharedClasses = SharedStyles();
  const { loading, error, data } = useQuery(GET_NEXT_LAUNCH, {
    variables: { language: "english" },
  });
  if (error) return <div />;
  const launchNext: any = data?.launchNext || false;
  if (!!launchNext) console.log(launchNext);
  return (
    <Grid direction="column" container spacing={1}>
      <Grid item xs={12}>
        <div style={{ color: "#fff" }}>
          <Typography variant="h4" color="secondary">
            Upcoming Launch
          </Typography>
        </div>
      </Grid>
      {loading && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography color="primary">Loading</Typography>
          </Grid>
        </Grid>
      )}
      {!loading && !!launchNext && (
        <Paper className={sharedClasses.paper}>
          <Grid
            container
            item
            justify="flex-start"
            alignContent="flex-start"
            spacing={1}
            xs={12}
            sm={12}
          >
            <Grid container item xs={12}>
              <Typography color="primary">Mission Name:&nbsp;</Typography>
              <Typography color="secondary">{` ${launchNext.mission_name}`}</Typography>
            </Grid>
            <Grid container item xs={12}>
              <Typography color="primary">Launch Time UTC:&nbsp;</Typography>
              <Typography color="secondary">{` ${moment(
                launchNext.launch_date_utc
              ).format("hh:mma DD/MM/YYYY")}`}</Typography>
            </Grid>
            <Grid container item xs={12}>
              <Typography color="primary">Rocket Type:&nbsp;</Typography>
              <Typography color="secondary">{` ${launchNext.rocket.rocket_name}`}</Typography>
            </Grid>
            <Grid container item xs={12}>
              <Typography color="primary">Details:&nbsp;</Typography>
              <Typography color="secondary">{` ${launchNext.details}`}</Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default MainPage;
