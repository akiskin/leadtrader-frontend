import apiClient from ".";

export const getSellCampaigns = async () => {
  try {
    const response = await apiClient.get("/sellcampaigns");

    if (response.status === 200) {
      return [true, response.data.data]; //laravel default data object
    } else {
      return [false, response.status];
    }
    //TODO 401?
  } catch (e) {
    return [false, e.toString()];
  }
};

export const createSellCampaign = async (
  product_id,
  stop_price,
  expiration
) => {
  try {
    const response = await apiClient.post("/sellcampaigns", {
      product_id,
      stop_price,
      expiration,
    });

    if (response.status === 201) {
      return [true, response.data];
    } else {
      return [false, response.status];
    }
    //TODO 401?
  } catch (e) {
    return [false, e.toString()];
  }
};
