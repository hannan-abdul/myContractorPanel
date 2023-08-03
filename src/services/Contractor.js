import axios from "axios";
import { baseUrl } from "../utils/urls";
import { getAuthHeaders } from '../utils';

// Contractor api 
export const contractorJobReviews = (id) => {
  return axios.get(`${baseUrl}job/review/list?id=${id}&page=1&limit=10&filter=true`, { headers: getAuthHeaders() })
};

export const allContractorList = (filter) => {
  return axios.get(`${baseUrl}user/manage/list/contractor?page=1&limit=50&filter=${filter}`, { headers: getAuthHeaders() })
};

export const approveUserData = (data) => {
  return axios.post(`${baseUrl}user/manage/approve`, data, { headers: getAuthHeaders() })
};
