import { parse } from "date-fns";
import { ACTIONS } from "./actions";

const initialState = {
  isLoading: false,
  list: [],
};

const sellcampaigns = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SELLCAMPAIGNS_LOADING_START:
      return { isLoading: true, list: [] };
    case ACTIONS.SELLCAMPAIGNS_LOADING_SUCCESS:
      return {
        isLoading: false,
        list: action.data.map((item) => ({
          ...item,
          date: parse(item.date_id, "yyyyMMdd", new Date()),
        })),
      };
    default:
      return state;
  }
};

export default sellcampaigns;
