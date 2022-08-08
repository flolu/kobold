import axios from 'axios'
import queryString from 'query-string'

const API_URL = 'https://api.coingecko.com/api/v3'

type PriceResponse = Record<string, Record<string, number>>

export async function getPrices(assets: string[], vsCurrencies: string[]) {
  const query = {ids: assets.join(','), vs_currencies: vsCurrencies}
  const url = `${API_URL}/simple/price?${queryString.stringify(query)}`
  const response = await axios.get<PriceResponse>(url)
  return response.data
}
