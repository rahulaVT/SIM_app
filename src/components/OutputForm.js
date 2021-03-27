import React, { useState, useContext } from "react";
import { Grid,List,ListItem, ListItemText } from "@material-ui/core";
import VizForm from "./VizForm";
// import { UserContext } from "../UserContext";
const axios = require('axios')
let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};

const fetchTransformedAttacks = (data) =>{
  return axios.post('http://localhost:5000/display', data, axiosConfig)
  .then(function (response) {
    // console.log(response);
    return response
  })
  .catch(function (error) {
    console.log(error);
  });
}

// const [output,setOutput] = useState([]);
let initialAttackData = {
  vertices:[],
  edges:[],
  links:[]
}
export default function OutputForm(props) {
    // const { data, setData } = useContext(UserContext);
    const {attacks,data} = props;
    const [newData, setNewData] = useState(initialAttackData)
    const [selectedIndex, setSelectedIndex] = useState();
    const handleClick = (attack, index) => {
      // console.log("clicked",attack,graph);
      // console.log("combined",{"graph":data,"attacks":attack});

      fetchTransformedAttacks({"graph":data,"attacks":attack}).then((randomData)=>{
        setNewData(randomData.data);
        setSelectedIndex(index);
        // console.log("final",randomData);

      });

    }
    return (
        <div>
          <Grid container>
            <Grid item md={2}>
              <List component="nav" aria-label="secondary mailbox folders">
              {attacks.map((item,i)=>(
                  <ListItem key={i} button 
                    selected = {selectedIndex === i}
                    onClick={handleClick.bind(this,item,i)}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
            </Grid>
            <Grid item xl={3}>
                <VizForm data={newData}/>
            </Grid>
          </Grid>
            
        </div>
    )
}
