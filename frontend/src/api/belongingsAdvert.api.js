
import axios from 'axios';
import { getToken } from '../util/getToken';
const token = getToken();

export const createBelongingsAdvert = async (formData) => {
    await axios.post("/belongings-advert", formData, {headers: {Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}})
         .catch(err => {throw err});
}

export const getBelongingsAdvertPage = async (page = 0, size = 10) => {
    return await axios.get(`/belongings-advert/page?page_no=${page}&size=${size}`)
                .then(res => res.data)
                .catch(err => {throw err});
}

export const getBelongingsAdvert = async (id) => {
    return await axios.get(`/belongings-advert/${id}`)
           .then(res => res.data)
           .catch(err => {throw err});
}

export const getBelongingsAdvertsByUser = async (userId) => {
    return await axios.get(`/belongings-advert/user?user_id=${userId}`)
                .then(res => res.data)
                .catch(err => {throw err});
}

export const updateBelongingsAdvert = async (id, formData) => {
    await axios.put(`/belongings-advert/${id}`, formData, {headers: {Authorization: `Bearer ${token}`}})
         .catch(err => {throw err});
}

export const deleteBelongingsAdvertImage = async (id, filename) => {
    await axios.put(`/belongings-advert/${id}/image/delete?filename=${filename}`, {headers: {Authorization: `Bearer ${token}`}})
         .catch(err => {throw err});
}

export const deleteBelongingsAdvert = async (id) => {
    await axios.delete(`/belongings-advert/${id}`, {headers: {Authorization: `Bearer ${token}`}})
         .catch(err => {throw err});
}

