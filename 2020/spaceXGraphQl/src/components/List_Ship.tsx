import { Divider, Grid, Hidden, Paper, Typography } from "@material-ui/core";
import moment from "moment";
import React, { FunctionComponent } from "react";
import { Cell, Pie, PieChart } from "recharts";
import SharedStyles from "../sharedStyles";

const ListShip: FunctionComponent<any> = ({ ship = {} }) => {
  const sharedClasses = SharedStyles();
  const data = [
    { name: "Success", value: ship.success_rate_pct || 0 },
    { name: "Fail", value: 100 - (ship.success_rate_pct || 0) },
  ];
  const COLORS = ["#00C49F", "#FF8042"];

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
              <Typography color="primary">Name:&nbsp;</Typography>
              <Typography color="secondary">{` ${ship.name}`}</Typography>
            </Grid>
            <Grid container item direction="row" xs={12}>
              <Typography color="primary">First Flight:&nbsp;</Typography>
              <Typography color="secondary">{` ${moment(
                ship.first_flight
              ).format("DD/MM/YYYY")}`}</Typography>
            </Grid>
            <Grid container item direction="row" xs={12}>
              <Typography color="primary">Cost per launch:&nbsp;</Typography>
              <Typography color="secondary">{` $${ship.cost_per_launch}`}</Typography>
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
              <Typography color="primary">Success Rate:&nbsp;</Typography>
              <Typography color="secondary">{` ${
                ship.success_rate_pct || 0
              }%`}</Typography>
            </Grid>
            <Grid container item justify="center" alignContent="center" xs={12}>
              <PieChart width={100} height={50}>
                <Pie
                  data={data}
                  //   cx={80}
                  cy={50}
                  innerRadius={40}
                  outerRadius={50}
                  fill="#8884d8"
                  //   paddingAngle={1}
                  dataKey="value"
                  //   startAngle={90}
                  //                   endAngle={-360}

                  startAngle={0}
                  endAngle={180}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ListShip;
