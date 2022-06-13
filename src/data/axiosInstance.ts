import axios, { AxiosInstance } from 'axios'

const BASE_URL = 'http://localhost:8080/'
const IMAGES_PATH = 'images/'

const axiosInstance: AxiosInstance = axios.create(
    { baseURL: BASE_URL }
);

export function getImageUrl(image: string) {
    return BASE_URL + IMAGES_PATH + image;
}

export default axiosInstance;