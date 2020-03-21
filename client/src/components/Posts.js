import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllPosts } from "../actions/post";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
  card: {
    maxWidth: 275
  },
  cardTitle: {
    fontSize: 20
  },
  cardDate: {
    fontSize: 12
  },
  pos: {
    marginBottom: 12
  },
  chip: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  }
}));

const Posts = ({ getAllPosts, post: { posts } }) => {
  const classes = useStyles();
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  return (
    <div className={classes.cardContainer}>
      {posts.map(post => (
        <Card className={classes.card} variant="outlined" key={post._id}>
          <CardContent>
            <Typography
              className={classes.cardTitle}
              color="textPrimary"
              gutterBottom
            >
              {post.postTitle}
            </Typography>
            <Typography
              className={classes.cardDate}
              color="textSecondary"
              gutterBottom
            >
              <Moment format="MMMM DD, YYYY">{post.date}</Moment>
            </Typography>
            <Typography variant="body2" component="p">
              {post.postContent}
            </Typography>
          </CardContent>
          <div className={classes.chip}>
            {post.postTags.map((tag, i) => (
              <Chip label={tag} key={i} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  post: state.post
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
