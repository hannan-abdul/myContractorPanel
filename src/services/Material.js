import axios from "axios";
import { baseUrl } from "../utils/urls";
import { getAuthHeaders } from '../utils';

// Material api 
// export const getMaterialList = () => {
//   return axios.get(`${baseUrl}material/list`, { headers: getAuthHeaders() });
// };

export const deleteMaterial = (id) => {
  return axios.delete(`${baseUrl}material/delete/${id}`, { headers: getAuthHeaders() });
};

export const updateMaterial = (data) => {
  return axios.put(`${baseUrl}material/update`, data, { headers: getAuthHeaders() });
};

export const postMaterial = (postData) => {
  return axios.post(`${baseUrl}material/create`, postData, { headers: getAuthHeaders() });
};
