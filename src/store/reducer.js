import { combineReducers } from "redux";

import auth from "./auth/reducer";
import sellcampaigns from "./sellcampaigns/reducer";
import buycampaigns from "./buycampaigns/reducer";
import products from "./products/reducer";

const rootReducer = combineReducers({
  auth,
  sellcampaigns,
  buycampaigns,
  products,
});

export default rootReducer;
