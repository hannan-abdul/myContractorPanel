import axios from "axios";
import { baseUrl } from "../utils/urls";
import { getAuthHeaders } from '../utils';

// Job api 
export const getJobList = (filter) => {
    return axios.get(`${baseUrl}job/category/list?page=1&limit=10&filter=${filter}`, { headers: getAuthHeaders() });
};

export const postJobCategory = (postCategory) => {
    return axios.post(`${baseUrl}job/category/create`, postCategory, { headers: getAuthHeaders() });
};

export const updateJobCategory = (data, id) => {
    return axios.post(`${baseUrl}job/category/update?id=${id}`, data, { headers: getAuthHeaders() });
};

export const deleteJobCategory = (deleteId) => {
    return axios.delete(`${baseUrl}job/category/delete?id=${deleteId}`, { headers: getAuthHeaders() });
};

export const getSingleJobCat = (getId) => {
    return axios.get(`${baseUrl}job/category/get?id=${getId}`, { headers: getAuthHeaders() });
};
