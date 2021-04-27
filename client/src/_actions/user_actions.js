import axios from "axios";
import { AUTH_USER, ADD_TO_CART, GET_DETAIL_FRIEND } from "./types";

export function auth() {
  const request = axios
    .get(`/api/users/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function addToCart(id) {
  const request = axios
    .post("/api/users/addToCart")
    .then((response) => response.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
}

export function getDetailFriend(id) {
  const request = axios
    .get(`/api/friends/friends_by_id?id=${id}`)
    .then((response) => response.data);

  return {
    type: GET_DETAIL_FRIEND,
    payload: request,
  };
}
