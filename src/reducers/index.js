import { combineReducers } from "redux";

const isLogged = (state = localStorage.getItem("isLogged") === "1", action) => {
  switch (action.type) {
    case "isLogged":
      return action.data;
    default:
      return state;
  }
};

const user_0 = (state = localStorage.getItem("user_id"), action) => {
  switch (action.type) {
    case "user_0":
      return action.data;
    default:
      return state;
  }
};

const user_1 = (state = "", action) => {
  switch (action.type) {
    case "user_1":
      return action.data;
    default:
      return state;
  }
};

const api_url = (state = "https://messanger-b.herokuapp.com", action) => {
  switch (action.type) {
    case "api_url":
      return state;
    default:
      return state;
  }
};

const allReducers = combineReducers({ isLogged, user_0, user_1, api_url });

export default allReducers;
