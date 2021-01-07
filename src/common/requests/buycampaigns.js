import apiClient from ".";

export const getBuyCampaigns = async () => {
  try {
    const response = await apiClient.get("/buycampaigns");

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

export const createBuyCampaign = async (
  name,
  product_id,
  max_price,
  budget,
  start,
  finish,
  buy_rules
) => {
  try {
    const body = {
      name,
      product_id,
      max_price,
      budget,
      start,
      finish,
      buy_rules,
    };
    const response = await apiClient.post("/buycampaigns", body);

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
