// A mock function to mimic making an async request for data
import axios from "axios"

export function fetchItemsAPI() {
  return axios.get('http://localhost:8080/cart')
}

export function addItemAPI(item) {
  return axios.post('http://localhost:8080/cart',item)
}

export function updateItemAPI(id,itemUpdate) {
  // console.log(id,itemUpdate)
  return axios.put(`http://localhost:8080/cart/${id}`,itemUpdate)
}

export function deleteItemAPI(id) {
  return axios.delete(`http://localhost:8080/cart/${id}`)
}

