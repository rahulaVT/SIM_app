import React, { useState } from "react";
import {
  Select,
  TextField,
  makeStyles,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Typography,
  Button,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "10px auto",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  title: {
    fontSize: 18,
  },
}));
const initialPhysicalConnectionValues = {
  connectionName: "",
  sources: ["space1", "space2", "space3"],
  targets: ["space1", "space2", "space3"],
  type: ["door", "window"],
};

export default function PhysicalConnectionForm() {
  const classes = useStyles();
  const [values, setValues] = useState(initialPhysicalConnectionValues);
  const [selectedAccessValue, setSelectedAccessValue] = useState("");

  const handleChange = (event) => {
    setSelectedAccessValue(event.target.value);
  };
  return (
    <div>
      <Typography className={classes.title} color="textPrimary" gutterBottom>
        Create Physical Connection
      </Typography>
      <form>
        <div>
          <TextField
            label="Connection Name"
            margin="normal"
            value={values.connectionName}
          ></TextField>
        </div>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-connection-source-label">Source</InputLabel>
            <Select
              labelId="select-connection-source-label"
              id="select-connection-source"
              variant="outlined"
              // onChange={handleChange}
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

              // onChange={handleChange}
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
              // onChange={handleChange}
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
              aria-label="gender"
              name="gender1"
              value={selectedAccessValue}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio size="small" />}
                label="one sided"
              />
              <FormControlLabel
                value="male"
                control={<Radio size="small" />}
                label="two sided"
              />
              <FormControlLabel
                value="other"
                control={<Radio size="small" />}
                label="no"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <Button type="submit" color="primary">
            Add
          </Button>
          <Button type="submit" color="primary">
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
}
