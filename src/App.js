import React, { useState } from "react";

import "./App.css";

import { makeStyles } from "@material-ui/styles";
import { Grid, Paper } from "@material-ui/core";
import SpaceForm from "./components/SpaceForm";
import DeviceForm from "./components/DeviceForm";
import PhysicalConnectionForm from "./components/PhysicalConnectionForm";
import CyberConnectionForm from "./components/CyberConnectionForm";
import { UserContext } from "./UserContext";

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
});

function App() {
  const classes = useStyles();
  const [data, setData] = useState({
    Spaces: [],
    Devices: [],
    PhysicalConnection: [],
  });
  return (
    <div className="App">
      <UserContext.Provider value={{ data, setData }}>
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
      </UserContext.Provider>
    </div>
  );
}

export default App;
