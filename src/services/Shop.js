import axios from "axios";
import { baseUrl } from "../utils/urls";
import { getAuthHeaders } from '../utils'

export const getShops = (subLicenseeUserId) => {
  return axios.get(`${baseUrl}api/user/subLicenseeShops`, { headers: getAuthHeaders() });
};

export const getShopProfile = (shopId) => {
  return axios.get(`${baseUrl}api/user/subLicenseeShops?subLicenseeShopId=${shopId}`, { headers: getAuthHeaders() });
};

export const createShop = (shop) => {
  return axios.post(`${baseUrl}api/user/subLicenseeShops`, shop, { headers: getAuthHeaders() });
};

export const updateShop = (shop, shopId) => {
  return axios.patch(`${baseUrl}api/user/subLicenseeShops?subLicenseeShopId=${shopId}`, shop, { headers: getAuthHeaders() });
};

export const deleteShop = (shopId) => {
  return axios.delete(`${baseUrl}api/user/subLicenseeShops?subLicenseeShopId=${shopId}`, { headers: getAuthHeaders() });
};

export const getMyProducts = () => {
  return axios.get(`${baseUrl}api/user/fmcgSublicenseeProduct?page=1&limit=10`, { headers: getAuthHeaders() });
};

export const shopTransfer = (shopData) => {
  return axios.put(`${baseUrl}api/user/fmcgSublicenseeToShopTransfer`, shopData, { headers: getAuthHeaders() });
};

export const getShopTransfer = (shopid) => {
  return axios.get(`${baseUrl}api/user/getShopTransferOrders?subLicenseeShopId=${shopid}`, { headers: getAuthHeaders() });
};

export const getShopTransferOrdersTransaction = (shopTransId) => {
  return axios.get(`${baseUrl}api/user/getShopTransferOrdersTransactions?shopTransferOrderId=${shopTransId}`, { headers: getAuthHeaders() });
};

export const updateShopTransferOrder = (data) => {
  return axios.put(`${baseUrl}api/user/updateShopTransferOrderTransactions`, data, { headers: getAuthHeaders() });
};
