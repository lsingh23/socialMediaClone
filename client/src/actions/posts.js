import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../utils/actionTypeConstants";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    console.log(data);
    const action = { type: FETCH_ALL, payload: data };
    dispatch(action);
  } catch (e) {
    console.log(e);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    const action = { type: CREATE, payload: data };
    dispatch(action);
  } catch (e) {
    console.log(e);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    const action = { type: UPDATE, payload: data };
    dispatch(action);
  } catch (e) {
    console.log(e);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    const action = { type: DELETE, payload: id };
    dispatch(action);
  } catch (e) {
    console.log(e);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    const action = { type: LIKE, payload: data };
    dispatch(action);
  } catch (e) {
    console.log(e);
  }
};
