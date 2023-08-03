import axios from "axios";
import { baseUrl } from "../utils/urls";
import { getAuthHeaders } from '../utils';

// property api 
export const getPropertyList = () => {
    return axios.get(`${baseUrl}property/list`, { headers: getAuthHeaders() });
};

export const updatePropertyPrice = (data) => {
    return axios.put(`${baseUrl}property/pricing/update`, data, { headers: getAuthHeaders() });
};

export const deletePropertyPrice = (id) => {
    return axios.delete(`${baseUrl}property/pricing/delete/${id}`, { headers: getAuthHeaders() });
};

export const postPropertyPrice = (postData) => {
    return axios.post(`${baseUrl}property/pricing/create`, postData, { headers: getAuthHeaders() });
};
