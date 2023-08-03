import axios from "axios";
import { baseUrl } from "../utils/urls";
import { getAuthHeaders } from '../utils';

// Complaint api 
export const getComplaintList = (filter) => {
    return axios.get(`${baseUrl}complaint/manage/list?page=1&limit=10&filter=${filter}`, { headers: getAuthHeaders() })
};

export const updateComplaint = (data, id) => {
    return axios.post(`${baseUrl}complaint/manage/update?id=${id}`, data, { headers: getAuthHeaders() })
};

export const getSingleComplaint = (getId) => {
    return axios.get(`${baseUrl}complaint/manage/get?id=${getId}`, { headers: getAuthHeaders() })
};
