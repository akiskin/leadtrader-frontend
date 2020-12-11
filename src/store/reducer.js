import { combineReducers } from "redux";

import sellcampaigns from './sellcampaigns/reducer'
import products from './products/reducer'

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
  sellcampaigns,
  products
});

export default rootReducer;
