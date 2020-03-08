import React, { useState } from "react";
import { connect } from "react-redux";
import { addUser } from "../actions/user";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    },
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const Form = ({ addUser }) => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: Number
  });
  const classes = useStyles();

  const onChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addUser(input);
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="standard-required"
            label="Required"
            defaultValue="First Name"
            onChange={onChange}
            name="firstName"
          />
          <TextField
            required
            id="standard-required"
            label="Required"
            defaultValue="Last Name"
            onChange={onChange}
            name="required"
            name="lastName"
          />
          <TextField
            required
            id="standard-required"
            label="Required"
            defaultValue="Email Address"
            onChange={onChange}
            name="required"
            name="email"
          />
          <TextField
            required
            id="standard-required"
            label="Required"
            defaultValue="(123)456-7890"
            onChange={onChange}
            name="required"
            name="phone"
          />
          <TextField
            id="standard-number"
            label="Age"
            type="number"
            onChange={onChange}
            InputLabelProps={{
              shrink: true
            }}
            name="age"
          />
          <Button onClick={onSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  addUser: PropTypes.func.isRequired
};

export default connect(null, { addUser })(Form);
