import 'jest-extended';
import axios from 'axios';
import { USER_PATH, REGISTER_PATH, LOGIN_PATH } from '../constants/constants';
import { SchemaValidator } from '../clients/schemaValidator';
import { singleUserByID, user } from '../schemes/index';
import { ApiClient } from '../clients/APIClient';

import postUser from '../json/postUser.json';
import register from '../json/register.json';

describe('Testing public API', () => {
  let schemaValidator: SchemaValidator;
  let obj: any;
  let schema: any;
  let apiCLient: ApiClient;
  let basePath: string;
  let responseBody: any;

  beforeAll(async () => {
    schemaValidator = new SchemaValidator(obj, schema);
    apiCLient = new ApiClient(basePath);
  });

  test('Check GET status all users', async () => {
    const getAllUsers = await axios.get(USER_PATH.GET_USERS_FROM_PAGE);
    const allUsersResponse = getAllUsers.data;
  });

  test('Check GET Single user by ID from page', async () => {
    const getAllUser = await apiCLient.getRequest(USER_PATH.GET_USERS_FROM_PAGE + `?page=1`);
    const allUsersResponse = getAllUser.data;

    const getResponse = await apiCLient.getRequest(USER_PATH.GET_USER + allUsersResponse.data[0].id);
    const userResponse = getResponse.data;

    expect(getResponse.status).toEqual(200);
    expect(userResponse.data.id).toEqual(allUsersResponse.data[0].id);
  });

  test('Check create user', async () => {
    postUser.job = 'job_' + Date.now();
    postUser.name = 'name_' + Date.now();

    const postResponse = await apiCLient.postRequest(USER_PATH.CREATE_USER, postUser);
    const userResponse = postResponse.data;

    expect(await schemaValidator.validate(userResponse, user)).toBeTruthy();
    expect(postResponse.status, 'Response should be 201').toEqual(201);
    expect(postResponse.data.job).toEqual(userResponse.job);
    expect(postResponse.data.name).toEqual(userResponse.name);
  });

  test('Check user ID after creation', async () => {
    postUser.job = 'My job is_' + Date.now();
    postUser.name = 'My name is_' + Date.now();

    const postResponse = await apiCLient.postRequest(USER_PATH.CREATE_USER, postUser);
    const userRespose = postResponse.data;

    expect(postResponse.status, 'Response should be 201').toEqual(201);

    const getCreatedUser = await apiCLient.getRequest(USER_PATH.GET_USER + userRespose.id);
    expect(getCreatedUser.status, 'Response should be 200').toEqual(200);
  });

  test('Check delete user from DB', async () => {
    const getAllUser = await apiCLient.getRequest(USER_PATH.GET_USERS_FROM_PAGE + `?page=1`);
    const allUsersResponse = getAllUser.data;

    const getResponse = await apiCLient.getRequest(USER_PATH.GET_USER + allUsersResponse.data[0].id);
    const userResponse = getResponse.data;

    expect((await apiCLient.deleteRequest(USER_PATH.DETETE_USER + userResponse.id)).status, 'Status should be 204').toEqual(204);
  });

  test('Check delete user after creation', async () => {
    postUser.job = 'job_' + Date.now();
    postUser.name = 'name_' + Date.now();

    const postResponse = await apiCLient.postRequest(USER_PATH.CREATE_USER, postUser);
    const userRespose = postResponse.data;

    expect((await apiCLient.deleteRequest(USER_PATH.DETETE_USER + userRespose.id)).status, 'Status should be 204').toEqual(204);
  });

  test('Check user after registaration by User_id', async () => {
    register.email = 'eve.holt@reqres.in';
    register.password = 'Password123!';

    const postRegister = await apiCLient.postRequest(REGISTER_PATH.POST_REGISTER, register);
    const registerResponse = postRegister.data;

    expect(postRegister.status, 'Status should be 200').toEqual(200);
    expect(registerResponse, 'Token should be').toHaveProperty('token');

    const getUserByID = await apiCLient.getRequest(USER_PATH.GET_USER + registerResponse.id);
    const userResponse = getUserByID.data;

    expect(getUserByID.status, 'Status should be').toEqual(200);
    expect(userResponse.data.email, 'Email should be the same').toEqual(register.email);
    expect(userResponse.data.id, 'ID should be the same').toEqual(registerResponse.id);
  });

  test('Check token after login', async () => {
    const user = { username: 'lpc10918@boofx.com', password: 'Password1!' };

    const postLogin = await apiCLient.postRequest('https://api.itemery.com/test%20comp/login', user);
    expect(postLogin.status, 'Status should be 200').toEqual(200);
    const loginResponse = postLogin.data;
    const token = await apiCLient.token(postLogin);

    expect(loginResponse, 'Token should be here').toHaveProperty('token');
    expect(loginResponse, 'RefreshToken should be here').toHaveProperty('refresh_token');
    expect(postLogin.status, 'Status should be 200').toEqual(200);

    const getUserData = await apiCLient.getRequest('https://api.itemery.com/users/profile', token);
    const userDataResponse = getUserData.data;

    expect(getUserData.status, 'Status should be 200').toEqual(200);
    expect(user.username, 'Email should be the same').toBe(userDataResponse.data.email);
    expect(userDataResponse.data.company_name, 'Company name should be the same').toBe('test comp');
  });
});
