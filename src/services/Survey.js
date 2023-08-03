import axios from "axios";
import { baseUrl } from "../utils/urls";
import { getAuthHeaders } from '../utils';

// Survey api 
export const addSurvey = (surveyData) => {
    return axios.post(`${baseUrl}survey/manage/create`, surveyData, { headers: getAuthHeaders() });
};

export const updateSurvey = (data, surId) => {
    return axios.post(`${baseUrl}survey/manage/update?id=${surId}`, data, { headers: getAuthHeaders() });
};

export const getAllServey = (filter) => {
    return axios.get(`${baseUrl}survey/manage/list?page=1&limit=10&filter=${filter}`, { headers: getAuthHeaders() });
};

export const getSingleServey = (getId) => {
    return axios.get(`${baseUrl}survey/manage/get?id=${getId}`, { headers: getAuthHeaders() });
};

export const deleteServey = (id) => {
    return axios.delete(`${baseUrl}survey/manage/remove?id=${id}`, { headers: getAuthHeaders() });
};
