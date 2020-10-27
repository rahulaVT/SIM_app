import React, { useState } from "react";
import styles from "./useStyles";
export function useForm(initialFValues) {
  const [values, setValues] = useState(initialFValues);
  const handleInputChange = (e) => {
    // console.log(e.target);
    const { name, value, id } = e.target;
    // console.log(name, value);
    setValues({
      ...values,
      [name]: value,
      id: id,
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
