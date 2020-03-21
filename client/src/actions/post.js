import axios from "axios";
import { CREATE_POST, GET_ALL_POSTS, DELETE_POST, SEARCH_TAGS } from "./types";

// Add Post
export const createPost = formData => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };

    const res = await axios.post("/api/post", formData, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data
    });
  } catch (error) {
    console.error("Error from Create Post action...");
  }
};

// Get All Posts
export const getAllPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/post");
    dispatch({
      type: GET_ALL_POSTS,
      payload: res.data
    });
  } catch (error) {
    console.error("Error from Get All Posts action...");
  }
};

// Delete Post by ID
export const deletePost = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/post/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: res.data
    });
  } catch (error) {
    console.error("Error from Delete Post action...");
  }
};

// Search Posts by Tag Names
export const searchTags = tags => async dispatch => {
  try {
    const res = await axios.get("/api/post");
    let searches = tags.split(/[ ,]+/);
    let posts = [];

    res.data.map(post => {
      let comparableValues = [];
      const postTags = post.postTags.values();
      for (const tag of postTags) {
        comparableValues.push(tag.toLowerCase());
      }

      for (const tag of comparableValues) {
        for (const search of searches) {
          if (tag === search) {
            if (posts.includes(post) === false) {
              posts.push(post);
            }
          }
        }
      }
      return null;
    });

    dispatch({
      type: SEARCH_TAGS,
      payload: posts
    });
  } catch (error) {}
};
