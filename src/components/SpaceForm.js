import React, { useState, useContext } from "react";
import { Button, TextField, Typography } from "@material-ui/core";

import { useForm, Form } from "./useForm";
import styles from "./useStyles";
import { CList } from "../components/controls/List";
import { UserContext } from "../UserContext";
const initialSpaceValues = {
  id: "",
  spaceName: "",
  area: 0,
  level: 0,
};
// const initialSpaces = [];
export default function SpaceForm() {
  const { data, setData } = useContext(UserContext);
  const classes = styles();
  const { values, setValues, handleInputChange } = useForm(initialSpaceValues);
  //   const [spaces, setSpaces] = useState(initialSpaces);
  const [isInputInvalid, setIsInputInvalid] = useState(false);

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
      ></CList>
    </div>
  );
}
