import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllPosts } from "../actions/post";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const SimpleTable = ({ getAllPosts, post: { posts } }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>Post Title</TableCell>
            <TableCell>Post Content</TableCell>
            <TableCell>Post Tags</TableCell>
            <TableCell>Post Likes</TableCell>
            <TableCell>Post Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post, i) => (
            <TableRow key={i}>
              <TableCell scope="row">{post.postTitle}</TableCell>
              <TableCell>{post.postContent}</TableCell>
              <TableCell>{post.postTags.map(tag => `${tag} `)}</TableCell>
              <TableCell>{post.postLikes.length}</TableCell>
              <TableCell>{post.postComments}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

SimpleTable.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  post: state.post
});

export default connect(mapStateToProps, { getAllPosts })(SimpleTable);
