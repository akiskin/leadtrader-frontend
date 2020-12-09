
export const ACTIONS = {
  SELLCAMPAIGNS_LOADING_START : "SELLCAMPAIGNS_LOADING_START",
  SELLCAMPAIGNS_LOADING_SUCCESS : "SELLCAMPAIGNS_LOADING_SUCCESS"
}

export const getSellCampaigns = () => async (dispatch) => {
  dispatch({type: ACTIONS.SELLCAMPAIGNS_LOADING_START})

  setTimeout(() => dispatch({type: ACTIONS.SELLCAMPAIGNS_LOADING_SUCCESS, data: []}), 2000)

}