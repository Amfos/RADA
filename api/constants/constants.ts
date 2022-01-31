const BASE_PATH = 'https://reqres.in/api';

export const USER_PATH = {
  GET_USERS_FROM_PAGE: `${BASE_PATH}/users`,
  GET_USER: `${BASE_PATH}/users/`,
  CREATE_USER: `${BASE_PATH}/users`,
  UPDATE_USER_PUT: `${BASE_PATH}/users`,
  UPTADE_USER_PATCH: `${BASE_PATH}/users`,
  DETETE_USER: `${BASE_PATH}/users/`,
};

export const REGISTER_PATH = {
  POST_REGISTER: `${BASE_PATH}/register`,
};

export const LOGIN_PATH = {
  POST_LOGIN: `${BASE_PATH}/login`,
};

export const SOURCE_PATH = {
  LIST: `${BASE_PATH}/unknown`,
  SINGLE: `${BASE_PATH}/unknown/`
}
