import axios from "axios"
import asyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "../App";

export const http = ({ shouldUseToken = true, apiUrl }) => {
    try {
        const a = axios.create({
            baseURL: apiUrl || baseUrl
        });

        a.interceptors.request.use(
            async (config) => {
                if (config.headers) {
                    config.headers["Content-Type"] = "application/json";
                    const token = await asyncStorage.getItem('token');
                    if (token && shouldUseToken) {
                        config.headers.token = token;
                    }
                }
                return config;

            },
            (error) => {
                return Promise.reject(error);
            }
        );

        a.interceptors.response.use(
            async (response) => {
                return response;
            },
            async (error) => {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        if (error.response.status === 401) {
                            return Promise.reject(error);
                        }
                    }
                    return Promise.reject(error);
                }
                return Promise.reject(error);
            }
        );
        return a;
    } catch (error) {
        console.log("Error: [http]", error)
    }
}