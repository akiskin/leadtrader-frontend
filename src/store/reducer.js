import { combineReducers } from "redux";

const initialState = {
  loggedIn: false,
  user: undefined,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, loggedIn: true };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
