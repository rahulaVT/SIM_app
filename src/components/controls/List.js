import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "../useStyles";
export function CList(props) {
  const { items, name, handleChildDelete, handleChildEdit } = props;
  const classes = styles();
  const handleDelete = (name) => {
    // console.log(name);
    handleChildDelete(name);
  };
  const handleEdit = (name) => {
    // console.log(name);
    handleChildEdit(name);
  };

  return (
    <List dense={true}>
      {items.map((item, i) => (
        <ListItem key={i} dense={true}>
          <ListItemText
            primary={item[name]}
            secondary={Object.entries(item)
              .filter(([key, value]) => !["id", name].includes(key))
              .join(" ")
              .replaceAll(",", ":")}
            key={i}
            // secondary={secondary ? 'Secondary text' : null}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="edit"
              name={item[name]}
              onClick={handleEdit.bind(this, item[name])}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              name={item[name]}
              onClick={handleDelete.bind(this, item[name])}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
