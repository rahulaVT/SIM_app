import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { makeStyles } from "@material-ui/styles";
import { Grid, Paper } from "@material-ui/core";
import SpaceForm from "./components/SpaceForm";
import DeviceForm from "./components/DeviceForm";
import PhysicalConnectionForm from "./components/PhysicalConnectionForm";
import CyberConnectionForm from "./components/CyberConnectionForm";

const flex = {
  alignItems: "left",
  justifyContent: "space-evenly",
};
const unit = 15;
const useStyles = makeStyles({
  root: {
    margin: `${unit * 3}px auto`,
    padding: unit * 2,
    maxWidth: 400,
  },
  // header: {
  //   ...flex,
  //   marginTop: unit * 2,
  // },
  // form: {
  //   ...flex,
  //   marginBottom: unit,
  // },
});

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={3}>
          <Paper elevation={2} className={classes.root}>
            <SpaceForm />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2} className={classes.root}>
            <DeviceForm />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2} className={classes.root}>
            <PhysicalConnectionForm />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2} className={classes.root}>
            <CyberConnectionForm />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
