import { gql, useQuery } from "@apollo/client";
import { Grid, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import ListLaunches from "../components/List_Launches";

const GET_ROCKETS = gql`
  query Rockets {
    launchesPast(limit: 10, sort: "launch_date_utc", order: "desc") {
      mission_name
      rocket {
        rocket_name
        rocket_type
        rocket {
          id
        }
      }
      launch_success
      launch_date_utc
      launch_date_local
    }
  }
`;

const MainPage: FunctionComponent = () => {
  const { loading, error, data } = useQuery(GET_ROCKETS, {
    variables: { language: "english" },
  });
  if (error) return <div />;
  const launchesPast: any[] = data?.launchesPast || [];
  //   if (!!launchesPast && launchesPast.length) console.log(launchesPast);
  return (
    <Grid direction="column" container spacing={1}>
      <Grid item xs={12}>
        <div style={{ color: "#fff" }}>
          <Typography variant="h4" color="secondary">
            Previous 10 Launches
          </Typography>
        </div>
      </Grid>
      {loading && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ color: "#fff" }}>
              <Typography color="primary">Loading</Typography>
            </div>
          </Grid>
        </Grid>
      )}
      {!loading &&
        launchesPast.length &&
        launchesPast.map((launch: any, index: number) => (
          <ListLaunches key={index} launch={launch} />
        ))}
    </Grid>
  );
};

export default MainPage;
