import axios from '../custom-axios/axios';

const Service = {
    register: (username, password) => {
        return axios.post("/users/register", {
            "username": username,
            "password": password
        });
    },
    login: (username, password) => {
        return axios.post("/users/login", {
            "username": username,
            "password": password
        });
    },
    fetchReservationsForUser: (username) => {
        return axios.get(`/reservations/user/${username}`);
    },
    reserve: (username, resourceId, dateFrom, dateTo) => {
        return axios.post("/reservations/reserve", {
            "username": username,
            "resourceId": resourceId,
            "dateFrom": dateFrom,
            "dateTo": dateTo
        });
    },
    fetchResources: (city = "", dateFrom = "", dateTo = "") => {
        return axios.post("/resources", null, {
            params: {
                city: city || undefined,
                dateFrom: dateFrom || undefined,
                dateTo: dateTo || undefined
            }
        });
    },
    fetchResourceById: (id) => {
        return axios.get(`/resources/${id}`);
    },
    createResource: (name, city, country, imageUrl, pricePerNight, category) => {
        return axios.post('/resources/create', {
            name: name,
            city: city,
            country: country,
            imageUrl: imageUrl,
            pricePerNight: pricePerNight,
            category: category,
        });
    },
    editResource: (resourceId, name, city, country, imageUrl, pricePerNight, category) => {
        return axios.put(`/resources/edit/${resourceId}`, {
            name: name,
            city: city,
            country: country,
            imageUrl: imageUrl,
            pricePerNight: pricePerNight,
            category: category,
        });
    },
    deleteResource: (resourceId) => {
        return axios.delete(`/resources/delete/${resourceId}`);
    },
    getLoggedInUser: () => {
        return axios.get(`/users/loggedIn`);
    },
    logout: () => {
        return axios.post(`/users/logout`);
    },
}

export default Service;
