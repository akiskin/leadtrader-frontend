import { ACTIONS } from "./actions";

const initialState = {
  isLoading: false,
  list: [],
  isCreating: false,
};

const buycampaigns = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.BUYCAMPAIGNS_LOADING_START:
      return { ...state, isLoading: true, list: [] };
    case ACTIONS.BUYCAMPAIGNS_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.data,
      };
    case ACTIONS.BUYCAMPAIGNS_CREATING_START:
      return { ...state, isCreating: true };
    case ACTIONS.BUYCAMPAIGNS_CREATING_SUCCESS:
      return {
        ...state,
        isCreating: false,
      };
    case ACTIONS.BUYCAMPAIGNS_UPDATE_ONE:
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

export default buycampaigns;
