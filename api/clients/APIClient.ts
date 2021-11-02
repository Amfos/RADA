import axios, { AxiosError } from 'axios';
import axiosInstance from 'axios';

export class ApiClient {
  basePath: string;
  obj: JSON;
  headers: object;

  constructor(basePath: string, obj: JSON, headers: object) {
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

  post = async (url: string, requestBody?: object, headers?: object) =>
    await this.apiRequest({
      method: 'post',
      url,
      data: requestBody,
    });

  get = async (url: string, headers?: object) =>
    await this.apiRequest({
      method: 'get',
      url,
      headers: headers,
    });

  put = async (url: string, requestBody?: object, headers?: object) =>
    await this.apiRequest({
      method: 'put',
      url,
      data: requestBody,
    });

  delete = async (url: string, requestBody?: object, headers?: object) =>
    await this.apiRequest({
      method: 'delete',
      url,
      data: requestBody,
    });
}
