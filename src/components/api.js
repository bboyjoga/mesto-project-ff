const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "244bef85-21c0-4152-acf2-eaedf37c3fbc",
    "Content-Type": "application/json",
  },
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

export const patchProfile = (data) => {
  const body = JSON.stringify(data);
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body,
  }).then(handleResponse);
};

export const createCardPost = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: config.headers
  }).then(handleResponse);
};

export const deleteMyCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers
  }).then(handleResponse);
};

export const putLikeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers
  }).then(handleResponse);
};

export const deleteLikeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers
  }).then(handleResponse);
};

export const patchAvatar = (data) => {
  const body = JSON.stringify(data);
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body,
  }).then(handleResponse);
};