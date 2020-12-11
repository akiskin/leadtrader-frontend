import { ACTIONS } from './actions'

const initialState = {
  isLoading: false,
  list: [],
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.PRODUCTS_LOADING_START:
      return { isLoading: true, list: [] };
    case ACTIONS.PRODUCTS_LOADING_SUCCESS:
      return {
        isLoading: false,
        list: action.data
      };
    default:
      return state;
  }
};

export default products;
