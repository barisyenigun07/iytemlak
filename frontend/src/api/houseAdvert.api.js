import axios from 'axios';

const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

export const createHouseAdvert = async (formData) => {
    await axios.post("/house-advert", formData, {headers: {Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}})
         .catch(err => {throw err});
    
}

export const getHouseAdverts = async () => {
    return await axios.get("/house-advert")
                .then(res => res.data)
                .catch(err => {throw err});
}

export const getHouseAdvertPage = async (page = 0, size = 10) => {
    return await axios.get(`/house-advert/page?page_no=${page}&size=${size}`)
                .then(res => res.data)
                .catch(err => {throw err});
}

export const getHouseAdvertsByUser = async (userId) => {
    return await axios.get(`/house-advert/user?user_id=${userId}`)
                .then(res => res.data)
                .catch(err => {throw err});
}

export const getHouseAdvert = async (id) => {
    return await axios.get(`/house-advert/${id}`)
                .then(res =>  res.data)
                .catch(err => {throw err});
}

export const updateHouseAdvert = async (id, data) => {
    await axios.put(`/house-advert/${id}`, data, {headers: {Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}})
         .catch(err => {throw err});
    
}

export const deleteHouseAdvertImage = async (id, filename) => {
    axios.put(`/house-advert/${id}/image/delete?filename=${filename}`, {headers: {Authorization: `Bearer ${token}`}})
         .catch(err => {throw err});
}

export const deleteHouseAdvert = async (id) => {
    axios.delete(`/house-advert/${id}`, {headers: {Authorization: `Bearer ${token}`}})
         .catch(err => {throw err});
}