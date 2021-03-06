import React, { useState, useContext } from "react";
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
import { CList } from "../components/controls/List";
import { UserContext } from "../UserContext";

let initialDeviceValues = {
  deviceName: "",
  type: ["sensor", "camera","controlled device","central control"],
  placement: ["space1", "space2"],
  networks: ["WIFI", "bluetooth", "Z-Wave", "Zigbee"],
  visibility: ["space1", "space2", "space3"],
  monitoring:[]
};
const initialDevices = [];
export default function DeviceForm() {
  const { data, setData } = useContext(UserContext);

  if (data.Spaces.length > 0) {
    initialDeviceValues.placement = data.Spaces.map((a) => a.spaceName);
    initialDeviceValues.visibility = data.Spaces.map((a) => a.spaceName);
    initialDeviceValues.monitoring = data.Spaces.map((a) => a.spaceName);
  }
  const classes = useStyles();
  const { values, setValues, handleInputChange } = useForm(initialDeviceValues);
  const [isInputInvalid, setIsInputInvalid] = useState(false);
  const [selectedNetworks, setSelectedNetworks] = useState([]);
  const [selectedVisibility, setSelectedVisibility] = useState([]);
  const [selectedMonitoringSpaces, setMonitoringSpaces] = useState([]);
  const handleMonitoringChange = (event) => {
    setMonitoringSpaces(event.target.value);
    setValues((values) => ({ ...values, monitoring: event.target.value }));
  };
  
  const handleNetworkChange = (event) => {
    setSelectedNetworks(event.target.value);
    setValues((values) => ({ ...values, networks: event.target.value }));
  };
  const handleVisibilityChange = (event) => {
    setSelectedVisibility(event.target.value);
    setValues((values) => ({ ...values, visibility: event.target.value }));
  };
  const handleAdd = (event) => {
    // check for duplicates

    if (
      data.Devices.some((item) => values["deviceName"] === item["deviceName"])
    ) {
      setIsInputInvalid(true);
      //   return;
    } else {
      setIsInputInvalid(false);
      setData((data) => ({ ...data, Devices: [...data.Devices, values] }));
    }
    // resent form values
    setValues(initialDeviceValues);
    setSelectedNetworks([]);
    setSelectedVisibility([]);
    setMonitoringSpaces([]);
  };
  const handleDelete = (name) => {
    const newItems = data.Devices.filter((item) => item["deviceName"] !== name);
    // setDevices(newItems);
    setData((data) => ({ ...data, Devices: newItems }));
    setValues(initialDeviceValues);
    setSelectedNetworks([]);
    setSelectedVisibility([]);
    setMonitoringSpaces([]);
  };

  const handleEdit = (name) => {
    // fill the form
    let oldValues = data.Devices.filter((r) => r.deviceName === name)[0];
    // oldValues.area = parseInt(oldValues.area);
    // oldValues.level = parseInt(oldValues.level);
    console.log("oldvalues");
    
    setValues(oldValues);
    console.log(values);
    // delete current values
    handleDelete(oldValues.deviceName);
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
            error={isInputInvalid}
            helperText={isInputInvalid && "name should be unique"}
          ></TextField>
        </div>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-device-type-label">Type</InputLabel>
            <Select
              labelId="select-device-type-label"
              id="select-device-type"
              variant="outlined"
              name="type"
              value={values.type}
              onChange={handleInputChange}
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
              name="placement"
              value={values.placement}
              onChange={handleInputChange}
            >
              {initialDeviceValues.placement.map((t) => (
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

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-mutiple-network-label">Monitoring Spaces</InputLabel>
            <Select
              labelId="select-mutiple-monitoring-spaces-label"
              id="select-mutiple-monitoring-spaces"
              multiple
              value={selectedMonitoringSpaces}
              onChange={handleMonitoringChange}
              input={<Input />}
              //   MenuProps={MenuProps}
            >
              {initialDeviceValues.monitoring.map((monitoring) => (
                <MenuItem
                  key={monitoring}
                  value={monitoring}
                  //   style={getStyles(name, personName, theme)}
                >
                  {monitoring}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
        items={data.Devices}
        name="deviceName"
        handleChildDelete={handleDelete}
        handleChildEdit={handleEdit}
      ></CList>
    </div>
  );
}
