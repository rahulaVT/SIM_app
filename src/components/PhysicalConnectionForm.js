import React, { useState, useContext } from "react";
import {
  Select,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Typography,
  Button,
} from "@material-ui/core/";
import useStyles from "./useStyles";
import { useForm, Form } from "./useForm";
import { CList } from "../components/controls/List";
import { UserContext } from "../UserContext";

const initialPhysicalConnectionValues = {
  connectionName: "pc_0",
  sources: ["space1", "space2", "space3"],
  targets: ["space1", "space2", "space3"],
  type: ["door", "window"],
  lock: "no",
};

export default function PhysicalConnectionForm() {
  const classes = useStyles();
  const { data, setData } = useContext(UserContext);
  const { values, setValues, handleInputChange } = useForm(
    initialPhysicalConnectionValues
  );
  if (data.Spaces.length > 0) {
    initialPhysicalConnectionValues.sources = data.Spaces.map(
      (a) => a.spaceName
    );
    initialPhysicalConnectionValues.targets = data.Spaces.map(
      (a) => a.spaceName
    );
  }

  const handleAdd = (event) => {
    // auto generate connection name based on length of the list
    let newValues = {
      values,
      connectionName: "pc_" + (data.PhysicalConnections.length + 1),
    };

    setData((data) => ({
      ...data,
      PhysicalConnections: [...data.PhysicalConnections, newValues],
    }));
    setValues(initialPhysicalConnectionValues);
  };

  const handleDelete = (name) => {
    const newItems = data.PhysicalConnections.filter(
      (item) => item["connectionName"] !== name
    );
    // setDevices(newItems);
    setData((data) => ({ ...data, PhysicalConnections: newItems }));
  };
  return (
    <div>
      <Typography className={classes.title} color="textPrimary" gutterBottom>
        Create Physical Connection
      </Typography>
      <Form>
        {/* <div>
          <TextField
            label="Connection Name"
            margin="normal"
            name="connectionName"
            variant="filled"
            // disabled={true}
            // defaultValue="hello"
            value={values.connectionName}
            onChange={handleUpdate}
          ></TextField>
        </div> */}
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-connection-source-label">Source</InputLabel>
            <Select
              labelId="select-connection-source-label"
              id="select-connection-source"
              variant="outlined"
              name="sources"
              values={values.sources}
              onChange={handleInputChange}
            >
              {initialPhysicalConnectionValues.sources.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-connection-target-label">Target</InputLabel>
            <Select
              labelId="select-connection-target-label"
              id="select-connection-target"
              variant="outlined"
              name="targets"
              value={values.targets}
              onChange={handleInputChange}
            >
              {initialPhysicalConnectionValues.targets.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-connection-type-label">Type</InputLabel>
            <Select
              labelId="select-connection-type-label"
              id="select-connection-type"
              variant="outlined"
              name="type"
              value={values.type}
              onChange={handleInputChange}
            >
              {initialPhysicalConnectionValues.type.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Lock</FormLabel>
            <RadioGroup
              id="radio-group-lock"
              aria-label="gender"
              name="lock"
              value={values.lock}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="one sided"
                control={<Radio size="small" />}
                label="one sided"
              />
              <FormControlLabel
                value="two sided"
                control={<Radio size="small" />}
                label="two sided"
              />
              <FormControlLabel
                value="no"
                control={<Radio size="small" />}
                label="no"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <Button color="primary" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </Form>
      <CList
        items={data.PhysicalConnections}
        name="connectionName"
        handleChildDelete={handleDelete}
      ></CList>
    </div>
  );
}
