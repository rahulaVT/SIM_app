import React, { useState } from "react";
import {
  Select,
  TextField,
  makeStyles,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  Typography,
  Button,
} from "@material-ui/core/";
import useStyles from "./useStyles";
import { useForm, Form } from "./useForm";

const initialDeviceValues = {
  id: 0,
  deviceName: "",
  type: ["type1", "type2"],
  placement: ["space1", "space2"],
  networks: ["WIFI", "bluetooth", "Google", "Amazon", "FB portal"],
  visibility: ["space1", "space2", "space3"],
};

export default function DeviceForm() {
  const classes = useStyles();
  const { values, setValues, handleInputChange } = useForm(initialDeviceValues);

  const [selectedNetworks, setSelectedNetworks] = useState([]);
  const [selectedVisibility, setSelectedVisibility] = useState([]);
  const handleNetworkChange = (event) => {
    setSelectedNetworks(event.target.value);
  };
  const handleVisibilityChange = (event) => {
    setSelectedVisibility(event.target.value);
  };

  return (
    <div>
      <Typography className={classes.title} color="textPrimary" gutterBottom>
        Add Devices
      </Typography>
      <Form>
        <div>
          <TextField
            label="Device Name"
            margin="normal"
            name="deviceName"
            value={values.deviceName}
            onChange={handleInputChange}
          ></TextField>
        </div>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-device-type-label">Type</InputLabel>
            <Select
              labelId="select-device-type-label"
              id="select-device-type"
              variant="outlined"
              // onChange={handleChange}
            >
              {initialDeviceValues.type.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-device-placement-label">
              Placement
            </InputLabel>
            <Select
              labelId="select-device-type-label"
              id="select-device-placement"
              variant="outlined"
              // onChange={handleChange}
            >
              {initialDeviceValues.type.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-mutiple-visibility-label">
              Visibility
            </InputLabel>
            <Select
              labelId="select-mutiple-visibility-label"
              id="select-mutiple-visibility"
              multiple
              value={selectedVisibility}
              onChange={handleVisibilityChange}
              input={<Input />}
              //   MenuProps={MenuProps}
            >
              {initialDeviceValues.visibility.map((visibility) => (
                <MenuItem
                  key={visibility}
                  value={visibility}
                  //   style={getStyles(name, personName, theme)}
                >
                  {visibility}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-mutiple-network-label">Network</InputLabel>
            <Select
              labelId="select-mutiple-network-label"
              id="select-mutiple-network"
              multiple
              value={selectedNetworks}
              onChange={handleNetworkChange}
              input={<Input />}
              //   MenuProps={MenuProps}
            >
              {initialDeviceValues.networks.map((network) => (
                <MenuItem
                  key={network}
                  value={network}
                  //   style={getStyles(name, personName, theme)}
                >
                  {network}
                </MenuItem>
              ))}
            </Select>
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
      </Form>
    </div>
  );
}