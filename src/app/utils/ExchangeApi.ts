import axios from "axios";
import config from "../config";

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${config.EXCHANGEAPI}/latest/${fromCurrency}`
    );
    const rate = response.data.conversion_rates[toCurrency];
    if (!rate) throw new Error('Invalid currency');
    return amount * rate;
  } catch (error) {
    throw new Error('Currency conversion failed');
  }
};

module.exports = { convertCurrency };