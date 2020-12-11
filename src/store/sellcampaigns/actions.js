export const ACTIONS = {
  SELLCAMPAIGNS_LOADING_START: "SELLCAMPAIGNS_LOADING_START",
  SELLCAMPAIGNS_LOADING_SUCCESS: "SELLCAMPAIGNS_LOADING_SUCCESS",
};

export const getSellCampaigns = () => async (dispatch) => {
  dispatch({ type: ACTIONS.SELLCAMPAIGNS_LOADING_START });

  setTimeout(
    () =>
      dispatch({
        type: ACTIONS.SELLCAMPAIGNS_LOADING_SUCCESS,
        data: MOCK_DATA.campaigns,
      }),
    0
  );
};

const MOCK_DATA = {
  campaigns: [
    {
      id: "0",
      date_id: "20201201",
      status: 0,
      product: {
        id: "0",
        name: "Pers Loan < $1k",
      },
      leads: 250,
      leads_sold: 240,
      leads_rejected: 10,
      earned: 1500.0,
    },
    {
      id: "1",
      date_id: "20201201",
      status: 0,
      product: {
        id: "0",
        name: "Pers Loan < $1k",
      },
      leads: 250,
      leads_sold: 240,
      leads_rejected: 10,
      earned: 1500.0,
    },
  ],
};
