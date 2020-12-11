export const ACTIONS = {
  PRODUCTS_LOADING_START: "PRODUCTS_LOADING_START",
  PRODUCTS_LOADING_SUCCESS: "PRODUCTS_LOADING_SUCCESS",
};

export const getProducts = () => async (dispatch) => {
  dispatch({ type: ACTIONS.PRODUCTS_LOADING_START });

  setTimeout(
    () =>
      dispatch({
        type: ACTIONS.PRODUCTS_LOADING_SUCCESS,
        data: MOCK_DATA.products,
      }),
    1500
  );
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
