import React, { useState, useContext } from "react";
import { Button, TextField, Typography, Checkbox, FormControlLabel } from "@material-ui/core";

import { useForm, Form } from "./useForm";
import styles from "./useStyles";
import { CList } from "../components/controls/List";
import { UserContext } from "../UserContext";
const initialSpaceValues = {
  id: "",
  spaceName: "",
  area: 0,
  level: 0,
  window:false,
  occupied:false
};
// const initialSpaces = [];
export default function SpaceForm() {
  const { data, setData } = useContext(UserContext);
  const classes = styles();
  const { values, setValues, handleInputChange } = useForm(initialSpaceValues);
  //   const [spaces, setSpaces] = useState(initialSpaces);
  const [isInputInvalid, setIsInputInvalid] = useState(false);
  
  const handleCheckbox = (event) =>{
    // setWindowCheckbox(event.target.checked);
    setValues((values) => ({ ...values, [event.target.name]: event.target.checked }));
  }

  const handleAdd = (event) => {
    // check for duplicates

    if (data.Spaces.some((item) => values["spaceName"] === item["spaceName"])) {
      setIsInputInvalid(true);
      //   return;
    } else {
      setIsInputInvalid(false);
      //   setSpaces((spaces) => [...spaces, values]);
      setData((data) => ({ ...data, Spaces: [...data.Spaces, values] }));
    }
    // reset the form to default state
    setValues(initialSpaceValues);
  };
  //handle delete and pass it as a prop
  const handleDelete = (name) => {
    const newItems = data.Spaces.filter((item) => item["spaceName"] !== name);
    setData((data) => ({ ...data, Spaces: newItems }));
  };
  const handleEdit = (name) => {
    // fill the form
    let oldValues = data.Spaces.filter((r) => r.spaceName === name)[0];
    oldValues.area = parseInt(oldValues.area);
    oldValues.level = parseInt(oldValues.level);
    // console.log("oldvalues");
    // console.log(oldValues);
    setValues(oldValues);

    // delete current values
    handleDelete(oldValues.spaceName);
  };
  return (
    <div>
      <Typography className={classes.title} color="textPrimary" gutterBottom>
        Add Spaces
      </Typography>
      <Form>
        <div>
          <TextField
            label="Space Name"
            margin="normal"
            name="spaceName"
            value={values.spaceName}
            id={values.spaceName}
            onChange={handleInputChange}
            error={isInputInvalid}
            helperText={isInputInvalid && "name should be unique"}
          ></TextField>
        </div>
        <div>
          <TextField
            label="Area(m^2)"
            type="number"
            margin="normal"
            name="area"
            value={values.area}
            id={values.spaceName}
            onChange={handleInputChange}
          ></TextField>
        </div>
        <div>
          <TextField
            label="Level"
            type="number"
            margin="normal"
            name="level"
            value={values.level}
            id={values.spaceName}
            onChange={handleInputChange}
          ></TextField>
        </div>
        <div>
          <FormControlLabel
          control={<Checkbox checked={values.window} onChange={handleCheckbox} name="window" id={values.spaceName} />}
          label="Window present"
        />
        <FormControlLabel
          control={<Checkbox checked={values.occupied} onChange={handleCheckbox} name="occupied" id={values.spaceName} />}
          label="Occupied"
        />
        </div>
        <div>
          <Button color="primary" onClick={handleAdd}>
            Add
          </Button>
          {/* <Button type="submit" color="primary">
            Delete
          </Button> */}
        </div>
      </Form>
      <CList
        items={data.Spaces}
        name="spaceName"
        handleChildDelete={handleDelete}
        handleChildEdit={handleEdit}
      ></CList>
    </div>
  );
}
