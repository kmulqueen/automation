import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createPost, searchTags, getAllPosts } from "../actions/post";
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

const Form = ({ createPost, getAllPosts, searchTags }) => {
  const initInputState = {
    postTitle: "",
    postContent: "",
    postTags: [],
    search: ""
  };
  const [input, setInput] = useState(initInputState);

  // Style
  const classes = useStyles();

  // Event Handlers
  const onChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onSearch = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
    const tagString = input.search;
    searchTags(tagString);
    if (e.target.value === "" || null) {
      getAllPosts();
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    createPost(input);
    setInput(initInputState);
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
            id="filled-required"
            label="Headline"
            variant="filled"
            onChange={onChange}
            name="postTitle"
            value={input.postTitle}
          />
          <TextField
            id="filled-textarea"
            label="Today I Worked On..."
            multiline
            onChange={onChange}
            name="postContent"
            required={true}
            value={input.postContent}
          />
          <TextField
            id="standard-basic"
            label="Tags"
            onChange={onChange}
            name="postTags"
            value={input.postTags}
          />
          <Button onClick={onSubmit} variant="contained" color="primary">
            Create Post
          </Button>
          <TextField
            id="filled-search"
            label="Search by tags"
            type="search"
            name="search"
            variant="filled"
            onChange={onSearch}
            value={input.search}
          />
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  createPost: PropTypes.func.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  searchTags: PropTypes.func.isRequired
};

export default connect(null, { createPost, getAllPosts, searchTags })(Form);
