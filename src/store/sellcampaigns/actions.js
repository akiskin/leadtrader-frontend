export const ACTIONS = {
  SELLCAMPAIGNS_LOADING_START: "SELLCAMPAIGNS_LOADING_START",
  SELLCAMPAIGNS_LOADING_SUCCESS: "SELLCAMPAIGNS_LOADING_SUCCESS",

  SELLCAMPAIGNS_CREATING_START: "SELLCAMPAIGNS_CREATING_START",
  SELLCAMPAIGNS_CREATING_SUCCESS: "SELLCAMPAIGNS_CREATING_SUCCESS",
};

export const getSellCampaigns = () => async (dispatch) => {
  dispatch({ type: ACTIONS.SELLCAMPAIGNS_LOADING_START });

  setTimeout(
    () =>
      dispatch({
        type: ACTIONS.SELLCAMPAIGNS_LOADING_SUCCESS,
        data: MOCK_DATA.campaigns,
      }),
    1500
  );
};

export const createSellCampaign = (
  productId,
  stopPrice,
  expiration,
  history = undefined
) => async (dispatch) => {
  dispatch({ type: ACTIONS.SELLCAMPAIGNS_CREATING_START });

  console.log(history);

  setTimeout(() => {
    dispatch({
      type: ACTIONS.SELLCAMPAIGNS_CREATING_SUCCESS,
      campaign: MOCK_DATA.newcampaign,
    });
    if (history) {
      history.push(`/sell/${MOCK_DATA.newcampaign.id}`);
    }
  }, 1500);
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
  newcampaign: {
    id: "3",
    date_id: "20201218",
    status: 0,
    product: {
      id: "0",
      name: "Pers Loan < $1k",
    },
    leads: 0,
    leads_sold: 0,
    leads_rejected: 0,
    earned: 0,
  },
};
