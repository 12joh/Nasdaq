import { sendAxiosRequest as AXIOS } from "../../../../services/axios";


export const getHotelDetailsRequest = async ({ id }: { id: number }) => {
  const response = await AXIOS({
    method: "GET",
    url: `/hotels?id=${id}`,
    body: {},
    headers: {},
  });
  return response;
};

export const getStocksRequest = async ({ search }: { search: string }) => {
  const response = await AXIOS({
    method: "GET",
    url: `/v3/reference/tickers?active=true&limit=100&apiKey=Ge_wJ8EPWs_ajWJyBRVj7zXy2R7Tgco2&search=${search}` ,
    body: {},
    headers: {},
  });
  return response;
};

