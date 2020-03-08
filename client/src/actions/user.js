import axios from "axios";
import { ADD_USER, GET_ALL_USERS, DELETE_USER } from "./types";

// Add User
export const addUser = formData => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };

    const res = await axios.post("/api/users", formData, config);
    dispatch({
      type: ADD_USER,
      payload: res.data
    });
    console.log("Add User ran..");
  } catch (error) {
    console.error("Error from Add User action...");
  }
};

// Get All Users
export const getAllUsers = () => async dispatch => {
  try {
    const res = await axios.get("/api/users");
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data
    });
  } catch (error) {
    console.error("Error from Get All Users action...");
  }
};

// Delete User by ID
export const deleteUser = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/users/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: res.data
    });
  } catch (error) {
    console.error("Error from Delete User action...");
  }
};
