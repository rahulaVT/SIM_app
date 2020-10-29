import React, { useState, useContext } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Typography,
  Button,
  TextField,
} from "@material-ui/core/";
import useStyles from "./useStyles";
import { useForm, Form } from "./useForm";
import { CList } from "../components/controls/List";
import { UserContext } from "../UserContext";

const initialCyberConnectionValues = {
  cyberConnectionName: "cc_0",
  sources: ["device1", "device2", "device3"],
  targets: ["device1", "device2", "device3"],
  networks: ["WIFI", "bluetooth"],
  securityTypes: ["Google", "Amazon"],
  securityLevel: "",
};
export default function CyberConnectionForm() {
  const classes = useStyles();
  const { data, setData } = useContext(UserContext);
  const { values, setValues, handleInputChange } = useForm(
    initialCyberConnectionValues
  );
  if (data.Devices.length > 0) {
    initialCyberConnectionValues.sources = data.Devices.map(
      (a) => a.deviceName
    );
    initialCyberConnectionValues.targets = data.Devices.map(
      (a) => a.deviceName
    );
  }
  const [selectedTargets, setSelectedTargets] = useState([]);
  const handleTargetChange = (event) => {
    setSelectedTargets(event.target.value);
    setValues((values) => ({ ...values, targets: event.target.value }));
  };

  const handleAdd = (event) => {
    let newValues = {
      values,
      cyberConnectionName: "cc_" + (data.CyberConnections.length + 1),
    };
    setData((data) => ({
      ...data,
      CyberConnections: [...data.CyberConnections, newValues],
    }));
    setValues(initialCyberConnectionValues);
    setSelectedTargets([]);
  };
  const handleDelete = (name) => {
    const newItems = data.CyberConnections.filter(
      (item) => item["cyberConnectionName"] !== name
    );
    // setDevices(newItems);
    setData((data) => ({ ...data, CyberConnections: newItems }));
  };
  return (
    <div>
      <Typography className={classes.title} color="textPrimary" gutterBottom>
        Create Cyber Connection
      </Typography>
      <Form>
        {/* <div>
          <TextField
            label="Connection Name"
            margin="normal"
            name="cyberConnectionName"
            value={values.cyberConnectionName}
            onChange={handleInputChange}
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
              value={values.sources}
              onChange={handleInputChange}
            >
              {initialCyberConnectionValues.sources.map((t) => (
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
              multiple
              value={selectedTargets}
              onChange={handleTargetChange}
            >
              {initialCyberConnectionValues.targets.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-connection-type-label">Network</InputLabel>
            <Select
              labelId="select-connection-type-label"
              id="select-connection-type"
              variant="outlined"
              name="networks"
              value={values.networks}
              onChange={handleInputChange}
            >
              {initialCyberConnectionValues.networks.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-acc-security-label">
              Account Security
            </InputLabel>
            <Select
              labelId="select-cacc-security-label"
              id="select-acc-security"
              variant="outlined"
              name="securityTypes"
              value={values.securityTypes}
              onChange={handleInputChange}
            >
              {initialCyberConnectionValues.securityTypes.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Network Security</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="securityLevel"
              value={values.securityLevel}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="weak"
                control={<Radio size="small" />}
                label="weak"
              />
              <FormControlLabel
                value="medium"
                control={<Radio size="small" />}
                label="medium"
              />
              <FormControlLabel
                value="strong"
                control={<Radio size="small" />}
                label="strong"
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
        items={data.CyberConnections}
        name="cyberConnectionName"
        handleChildDelete={handleDelete}
      ></CList>
    </div>
  );
}
