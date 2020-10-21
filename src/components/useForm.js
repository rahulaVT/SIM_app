import React, { useState } from "react";
import styles from "./useStyles";
export function useForm(initialFValues) {
  const [values, setValues] = useState(initialFValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return {
    values,
    setValues,
    handleInputChange,
  };
}

export function Form(props) {
  const classes = styles();
  return (
    <form className={classes.root} autoComplete="off">
      {props.children}
    </form>
  );
}
