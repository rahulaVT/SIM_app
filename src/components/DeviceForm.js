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
  const [values, setValues] = useState(initialDeviceValues);
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
      <form>
        <div>
          <TextField
            label="Device Name"
            margin="normal"
            value={values.deviceName}
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
      </form>
    </div>
  );
}
