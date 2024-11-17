import axios from 'axios';
import { getToken } from '../util/getToken';

const token = getToken();

export const createHousemateWantingAdvert = async (data) => {
    await axios.post("/housemate-wanting-advert", data, {headers: {Authorization: `Bearer ${token}`}})
         .catch(err => {throw err});
}

export const getHousemateWantingAdverts = async () => {
    return await axios.get("/housemate-wanting-advert")
                .then(res => res.data)
                .catch(err => {throw err});
}

export const getHousemateWantingAdvertPage = async (page = 0, size = 10) => {
    return await axios.get(`/housemate-wanting-advert/page?page_no=${page}&size=${size}`)
         .then(res => res.data)
         .catch(err => {throw err});
}

export const getHousemateWantingAdvertsByUser = async (userId) => {
    return await axios.get(`/housemate-wanting-advert/user?user_id=${userId}`)
                .then(res => res.data)
                .catch(err => {throw err});
}

export const getHousemateWantingAdvert = async (id) => {
    return await axios.get(`/housemate-wanting-advert/${id}`)
         .then(res => res.data)
         .catch(err => {throw err});
}

export const updateHousemateWantingAdvert = async (id, data) => {
    await axios.put(`/housemate-wanting-advert/${id}`, data, {headers: {Authorization: `Bearer ${token}`}})
         .catch(err => {throw err});
}

export const deleteHousemateWantingAdvert = async (id) => {
    await axios.delete(`/housemate-searching-advert/${id}`, {headers: {Authorization: `Bearer ${token}`}})
         .catch(err => {throw err});
}