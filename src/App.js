import React, { useEffect, useState } from "react";

import "./App.css";

import { makeStyles } from "@material-ui/styles";
import { Button, Grid, Paper, List,ListItem, ListItemText } from "@material-ui/core";
import SpaceForm from "./components/SpaceForm";
import DeviceForm from "./components/DeviceForm";
import PhysicalConnectionForm from "./components/PhysicalConnectionForm";
import CyberConnectionForm from "./components/CyberConnectionForm";
import { UserContext } from "./UserContext";
import OutputForm from "./components/OutputForm";

const axios = require('axios')
const fs = require("fs");
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
let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};

const fetchAttacks = (data) =>{
  return axios.post('http://localhost:5000/run', data, axiosConfig)
  .then(function (response) {
    // console.log(response);
    return response
  })
  .catch(function (error) {
    console.log(error);
  });
}
function App() {
  const classes = useStyles();
  const [data, setData] = useState({
    Spaces: [],
    Devices: [],
    PhysicalConnections: [],
    CyberConnections: [],
  });
  const handleSaveToPC = (jsonData, filename) => {
    const fileData = JSON.stringify(jsonData, null, 4);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${filename}.json`;
    link.href = url;
    link.click();
  };
  const handleSubmit = () => {
    handleSaveToPC(data, "simData");
  };
  const handleLoad = ({ target }) => {
    //
    const fileReader = new FileReader();
    fileReader.readAsText(target.files[0]);
    fileReader.onload = (e) => {
      console.log(JSON.parse(e.target.result));
      setData(JSON.parse(e.target.result));
    };
    // console.log(e.target.result);
  };
 
  const [output,setOutput] = useState([]);
  const handleRun = () =>{
    fetchAttacks(data).then((randomData)=>{
      setOutput(randomData.data.attacks);
    });
    
  }
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
      <Button color="primary" variant="outlined" onClick={handleSubmit}>
        Submit
      </Button>
      <Button color="primary" variant="outlined" onClick={handleRun}>
        Run Simulation
      </Button>

      <input
        style={{ display: "none" }}
        id="upload-data"
        name="upload-data"
        type="file"
        onChange={handleLoad}
        accept="application/json"
      />
      <label htmlFor="upload-data">
        <Button color="secondary" variant="outlined" component="span">
          Load data
        </Button>
      </label>
      <OutputForm attacks={output} data={data} />
    </div>
  );
}

export default App;
