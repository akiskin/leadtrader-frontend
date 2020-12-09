const initialState = {
  isLoading: false,
  list: [],
};

const sellcampaigns = (state = initialState, action) => {
  switch (action.type) {
    case "SELLCAMPAIGNS_LOADING_START":
      return { isLoading: true, list: [] };
    case "SELLCAMPAIGNS_LOADING_SUCCESS":
      return { isLoading: false, list: action.data };
    default:
      return state;
  }
};

export default sellcampaigns;