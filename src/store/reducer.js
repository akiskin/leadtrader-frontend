import { combineReducers } from "redux";

import auth from "./auth/reducer";
import sellcampaigns from "./sellcampaigns/reducer";
import products from "./products/reducer";

const rootReducer = combineReducers({
  auth,
  sellcampaigns,
  products,
});

export default rootReducer;
