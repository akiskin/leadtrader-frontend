import {
  getBuyCampaigns as requestGetBuyCampaigns,
  createBuyCampaign as requestCreateBuyCampaign,
} from "common/requests/buycampaigns";

export const ACTIONS = {
  BUYCAMPAIGNS_LOADING_START: "BUYCAMPAIGNS_LOADING_START",
  BUYCAMPAIGNS_LOADING_SUCCESS: "BUYCAMPAIGNS_LOADING_SUCCESS",

  BUYCAMPAIGNS_CREATING_START: "BUYCAMPAIGNS_CREATING_START",
  BUYCAMPAIGNS_CREATING_SUCCESS: "BUYCAMPAIGNS_CREATING_SUCCESS",

  BUYCAMPAIGNS_UPDATE_ONE: "BUYCAMPAIGNS_UPDATE_ONE",
};

export const getBuyCampaigns = () => async (dispatch) => {
  dispatch({ type: ACTIONS.BUYCAMPAIGNS_LOADING_START });

  const [success, data] = await requestGetBuyCampaigns();

  if (success) {
    dispatch({
      type: ACTIONS.BUYCAMPAIGNS_LOADING_SUCCESS,
      data: data.map((row) => ({ ...row, date: new Date(row.created_at) })),
    });
  } //TODO error handling
};

export const createBuyCampaign = (
  name,
  productId,
  maxPrice,
  budget,
  start,
  finish,
  rules,
  history = undefined
) => async (dispatch) => {
  dispatch({ type: ACTIONS.BUYCAMPAIGNS_CREATING_START });

  const [success, data] = await requestCreateBuyCampaign(
    name,
    productId,
    maxPrice,
    budget,
    start,
    finish,
    rules
  );

  if (success) {
    dispatch({
      type: ACTIONS.BUYCAMPAIGNS_CREATING_SUCCESS,
      campaign: { ...data, date: new Date(data.created_at) },
    });
    dispatch(getBuyCampaigns());
    if (history) {
      history.push(`/buy/${data.id}`);
    }
  }
};
