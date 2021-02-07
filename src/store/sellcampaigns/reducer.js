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
        list: action.data,
      };
    case ACTIONS.SELLCAMPAIGNS_CREATING_START:
      return { ...state, isCreating: true };
    case ACTIONS.SELLCAMPAIGNS_CREATING_SUCCESS:
      return {
        ...state,
        isCreating: false,
        list: [...state.list, action.campaign],
      };
    case ACTIONS.SELLCAMPAIGNS_UPDATE_ONE:
      return {
        ...state,
        list: [
          ...state.list.filter((c) => c.id !== action.campaign.id),
          action.campaign,
        ],
      };
    default:
      return state;
  }
};

export default sellcampaigns;
