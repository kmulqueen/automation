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

  // Style
  const classes = useStyles();

  // Event Handlers
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
            label="First Name"
            defaultValue=""
            onChange={onChange}
            name="firstName"
          />
          <TextField
            required
            id="standard-required"
            label="Last Name"
            defaultValue=""
            onChange={onChange}
            name="required"
            name="lastName"
          />
          <TextField
            required
            id="standard-required"
            label="Email"
            defaultValue=""
            onChange={onChange}
            name="required"
            name="email"
          />
          <TextField
            required
            id="standard-helperText"
            label="Phone Number"
            defaultValue=""
            onChange={onChange}
            helperText="(123)456-7890"
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
