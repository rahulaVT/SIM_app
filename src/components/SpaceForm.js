import { Grid } from "@material-ui/core";
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
import { useForm, Form } from "./useForm";
import styles from "./useStyles";

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
  const classes = styles();
  const { values, setValues, handleInputChange } = useForm(initialSpaceValues);

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
            onChange={handleInputChange}
          ></TextField>
        </div>
        <div>
          <TextField
            label="Area(m^2)"
            type="number"
            margin="normal"
            name="area"
            value={values.area}
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
            onChange={handleInputChange}
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
      </Form>
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
