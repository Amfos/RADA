import axios, { AxiosError } from 'axios';
import axiosInstance from 'axios';

export class ApiClient {
  basePath: string;
  obj: any;
  headers: any;

  constructor(basePath: string, obj?: object, headers?: object) {
    this.basePath = basePath;
    this.obj = obj;
    this.headers = headers;
  }

  async token(responseBody: any) {
    const headers = responseBody.data.token;
    const config = { Authorization: `${headers}` };
    return config;
  }

  async apiRequest(axiosConfig: any) {
    try {
      const response = await axiosInstance(axiosConfig);
      return response;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return err.response;
      }
      throw new Error('Validation failed');
    }
  }

  postRequest = async (url: string, requestBody?: any, headers?: object) =>
    await this.apiRequest({
      method: 'post',
      url,
      data: requestBody,
    });

  getRequest = async (url: string, headers?: object) =>
    await this.apiRequest({
      method: 'get',
      url,
      headers: headers,
    });

  putRequest = async (url: string, requestBody?: any, headers?: object) =>
    await this.apiRequest({
      method: 'put',
      url,
      data: requestBody,
    });

  deleteRequest = async (url: string, requestBody?: any, headers?: object) =>
    await this.apiRequest({
      method: 'delete',
      url,
      data: requestBody,
    });
}
