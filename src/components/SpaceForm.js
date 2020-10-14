import { Grid, makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Typography,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "10px auto",
  },
  title: {
    fontSize: 18,
  },
});
const initialSpaceValues = {
  id: 0,
  spaceName: "",
  area: 0,
  level: 0,
};
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
export default function SpaceForm() {
  const classes = useStyles();
  const [values, setValues] = useState(initialSpaceValues);
  return (
    <div>
      <Typography className={classes.title} color="textPrimary" gutterBottom>
        Add Spaces
      </Typography>
      <form className={classes.form}>
        <div>
          <TextField
            label="Space Name"
            margin="normal"
            value={values.spaceName}
          ></TextField>
        </div>
        <div>
          <TextField
            label="Area(m^2)"
            type="number"
            margin="normal"
            value={values.area}
          ></TextField>
        </div>
        <div>
          <TextField
            label="Level"
            ype="number"
            margin="normal"
            value={values.level}
          ></TextField>
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
      <List dense={false}>
        {generate(
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Single-line item"
              // secondary={secondary ? 'Secondary text' : null}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    </div>
  );
}
