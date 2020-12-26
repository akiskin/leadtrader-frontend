import { getProducts as requestGetProducts } from "common/requests/products";

export const ACTIONS = {
  PRODUCTS_LOADING_START: "PRODUCTS_LOADING_START",
  PRODUCTS_LOADING_SUCCESS: "PRODUCTS_LOADING_SUCCESS",
};

export const getProducts = () => async (dispatch) => {
  dispatch({ type: ACTIONS.PRODUCTS_LOADING_START });

  const [success, data] = await requestGetProducts();

  if (success) {
    dispatch({
      type: ACTIONS.PRODUCTS_LOADING_SUCCESS,
      //data: MOCK_DATA.products,
      data,
    });
  }
};

const MOCK_DATA = {
  products: [
    {
      id: "0",
      name: "Small Personal < $1k",
    },
    {
      id: "1",
      name: "Medium Personal < $3k",
    },
  ],
};
