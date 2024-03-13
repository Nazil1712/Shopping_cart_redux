// A mock function to mimic making an async request for data
import axios from "axios"

export function fetchProductsAPI(amount = 1) {
  return axios.get('http://localhost:8080/products')
}
