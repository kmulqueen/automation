import { ADD_USER, GET_ALL_USERS, DELETE_USER } from "../actions/types";

const initialState = {
  user: null,
  users: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER:
      return {
        ...state,
        user: payload,
        users: [...state.users, payload],
        loading: false
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id != payload),
        loading: false
      };

    default:
      return state;
  }
}
