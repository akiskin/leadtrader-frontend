import { parse } from "date-fns";
import { ACTIONS } from "./actions";

const initialState = {
  isLoading: false,
  list: [],
  isCreating: false,
};

const sellcampaigns = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SELLCAMPAIGNS_LOADING_START:
      return { ...state, isLoading: true, list: [] };
    case ACTIONS.SELLCAMPAIGNS_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.data.map((item) => ({
          ...item,
          date: parse(item.date_id, "yyyyMMdd", new Date()),
        })),
      };
    case ACTIONS.SELLCAMPAIGNS_CREATING_START:
      return { ...state, isCreating: true };
    case ACTIONS.SELLCAMPAIGNS_CREATING_SUCCESS:
      return {
        ...state,
        isCreating: false,
        list: [
          ...state.list,
          {
            ...action.campaign,
            date: parse(action.campaign.date_id, "yyyyMMdd", new Date()),
          },
        ],
      };
    default:
      return state;
  }
};

export default sellcampaigns;
