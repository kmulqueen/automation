import {
  CREATE_POST,
  GET_ALL_POSTS,
  DELETE_POST,
  SEARCH_TAGS
} from "../actions/types";

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_POST:
      return {
        ...state,
        post: payload,
        posts: [...state.posts, payload],
        loading: false
      };
    case GET_ALL_POSTS:
    case SEARCH_TAGS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
