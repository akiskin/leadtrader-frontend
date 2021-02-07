import {
  getSellCampaigns as requestGetSellCampaigns,
  createSellCampaign as requestCreateSellCampaign,
} from "common/requests/sellcampaigns";

export const ACTIONS = {
  SELLCAMPAIGNS_LOADING_START: "SELLCAMPAIGNS_LOADING_START",
  SELLCAMPAIGNS_LOADING_SUCCESS: "SELLCAMPAIGNS_LOADING_SUCCESS",

  SELLCAMPAIGNS_CREATING_START: "SELLCAMPAIGNS_CREATING_START",
  SELLCAMPAIGNS_CREATING_SUCCESS: "SELLCAMPAIGNS_CREATING_SUCCESS",

  SELLCAMPAIGNS_UPDATE_ONE: "SELLCAMPAIGNS_UPDATE_ONE",
};

export const getSellCampaigns = () => async (dispatch) => {
  dispatch({ type: ACTIONS.SELLCAMPAIGNS_LOADING_START });

  const [success, data] = await requestGetSellCampaigns();

  if (success) {
    dispatch({
      type: ACTIONS.SELLCAMPAIGNS_LOADING_SUCCESS,
      data: data.map((row) => ({ ...row, date: new Date(row.created_at) })),
    });
  } //TODO error handling
};

export const createSellCampaign = (
  productId,
  stopPrice,
  expiration,
  history = undefined
) => async (dispatch) => {
  dispatch({ type: ACTIONS.SELLCAMPAIGNS_CREATING_START });

  const [success, data] = await requestCreateSellCampaign(
    productId,
    stopPrice,
    expiration
  );

  if (success) {
    dispatch({
      type: ACTIONS.SELLCAMPAIGNS_CREATING_SUCCESS,
      campaign: { ...data, date: new Date(data.created_at) },
    });
    if (history) {
      history.push(`/sell/${data.id}`);
    }
  }
};
