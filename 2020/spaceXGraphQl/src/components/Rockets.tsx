import { gql, useQuery } from "@apollo/client";
import { Grid, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import ListShip from "../components/List_Ship";

const GET_ROCKETS = gql`
  query Rockets {
    rockets(limit: 10) {
      name
      success_rate_pct
      stages
      id
      height {
        meters
      }
      cost_per_launch
      first_flight
    }
  }
`;

const MainPage: FunctionComponent = () => {
  const { loading, error, data } = useQuery(GET_ROCKETS, {
    variables: { language: "english" },
  });
  if (error) return <div />;
  const ships: any[] = data?.rockets || [];
  if (!!ships && ships.length) console.log(ships);
  return (
    <Grid direction="column" container spacing={1}>
      <Grid item xs={12}>
        <div style={{ color: "#fff" }}>
          <Typography variant="h4" color="secondary">
            Rocket Types
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
      {!loading &&
        ships.length &&
        ships.map((ship: any, index: number) => (
          <ListShip key={index} ship={ship} />
        ))}
    </Grid>
  );
};

export default MainPage;
