import axios from 'axios';

export const API_BASE_URL = process.env.API_BASE_URL?.toString();

export async function post<T>(path:string, data:any) {
    const response = await axios.post<T>( API_BASE_URL + path, data);
    return response;
}

export async function get<T>(path:string) {
    const response = await axios.get<T>( API_BASE_URL + path);
    return response;
}