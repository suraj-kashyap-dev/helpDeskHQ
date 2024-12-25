import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_URL } from '../config/constant';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

class HttpClient {
  private static instance: HttpClient;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }

    return HttpClient.instance;
  }

  public async get<T>(url: string) {
    return this.api.get<T>(url);
  }

  public async post<T>(url: string, data?: any, config: object = {}) {
    return this.api.post<T>(url, data, config);
  }

  public async put<T>(url: string, data?: any, config: object = {}) {
    return this.api.put<T>(url, data, config);
  }

  public async delete<T>(url: string) {
    return this.api.delete<T>(url);
  }
}

export const httpClient = HttpClient.getInstance();
