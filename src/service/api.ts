import axios from "axios";
import BaseUrl from "./url";

const $api = axios.create({
    baseURL: `${BaseUrl}/api/`,
})

export default $api;