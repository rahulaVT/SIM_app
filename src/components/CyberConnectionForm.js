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

const initialCyberConnectionValues = {
  sources: ["device1", "device2", "device3"],
  targets: ["device1", "device2", "device3"],
  networks: ["WIFI", "bluetooth"],
  securityTypes: ["Google", "Amazon"],
};
export default function CyberConnectionForm() {
  const classes = useStyles();
  const [selectedTargets, setSelectedTargets] = useState([]);
  const handleTargetChange = (event) => {
    setSelectedTargets(event.target.value);
  };
  const [selectedNetworkSecurity, setSelectedNetworkSecurity] = useState("");
  const handleChange = (event) => {
    setSelectedNetworkSecurity(event.target.value);
  };
  return (
    <div>
      <Typography className={classes.title} color="textPrimary" gutterBottom>
        Create Cyber Connection
      </Typography>
      <form>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-connection-source-label">Source</InputLabel>
            <Select
              labelId="select-connection-source-label"
              id="select-connection-source"
              variant="outlined"
              // onChange={handleChange}
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
              // onChange={handleChange}
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
              // onChange={handleChange}
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
              name="gender1"
              value={selectedNetworkSecurity}
              onChange={handleChange}
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
