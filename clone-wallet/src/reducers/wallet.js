import {
  FETCH_CURRENCIES_API_SUCCESS,
  FETCH_EXCHANGE_RATES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES_API_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case FETCH_EXCHANGE_RATES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
