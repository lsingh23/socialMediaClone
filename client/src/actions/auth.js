import * as api from "../api";
import { AUTH } from "../utils/actionTypeConstants";

export const signin = (formData, history) => async (dispatch) => {
  try {
    //sign in the user
    history.push("/");
  } catch (e) {
    console.log(e);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    //sign up the user
    history.push("/");
  } catch (e) {
    console.log(e);
  }
};
