import { makeStyles } from "@material-ui/core";
export default makeStyles((theme) => ({
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
