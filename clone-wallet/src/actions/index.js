export const CHANGE_EMAIL = 'CHANGE_EMAIL';

export const changeEmail = (email) => ({
  type: CHANGE_EMAIL,
  payload: email,
});

export const FETCH_CURRENCIES_API_SUCCESS = 'FETCH_ECONOMY_API_SUCCESS';

export const fetchEconomyAPISucess = (response) => ({
  type: FETCH_CURRENCIES_API_SUCCESS,
  payload: response,
});

const URL_API = 'https://economia.awesomeapi.com.br/json/all';

export const fetchCurrenciesAPIThunk = () => async (dispatch) => {
  const response = await fetch(URL_API);
  const json = await response.json();
  const currencies = Object.keys(json);
  const filterResult = currencies.filter((currencie) => currencie !== 'USDT');
  dispatch(fetchEconomyAPISucess(filterResult));
};

export const FETCH_EXCHANGE_RATES = 'FETCH_EXCHANGE_RATES';

export const fetchExchangeRates = (response) => ({
  type: FETCH_EXCHANGE_RATES,
  payload: response,
});

export const fetchExchangeRatesThunk = (object) => async (dispatch) => {
  const response = await fetch(URL_API);
  const json = await response.json();
  const result = {
    ...object,
    exchangeRates: json,
  };
  dispatch(fetchExchangeRates(result));
};
