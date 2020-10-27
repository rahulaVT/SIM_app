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
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

export function CList(props) {
  const { items, name, handleChildDelete } = props;

  const handleDelete = (name) => {
    // console.log(name);
    handleChildDelete(name);
  };
  return (
    <List dense={true}>
      {items.map((item, i) => (
        <ListItem key={i}>
          <ListItemText
            primary={item[name]}
            key={i}
            // secondary={secondary ? 'Secondary text' : null}
          />
          <ListItemSecondaryAction>
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
