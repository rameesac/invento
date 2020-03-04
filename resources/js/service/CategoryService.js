import axios from 'axios';

export async function get() {
    return axios.get('/api/category').then(res => res.data);
}

export async function list() {
    return axios.get('/api/category/list').then(res => res.data);
}

export async function save(category) {
    return axios
        .post('/api/category', { ...category })
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            throw error;
        });
}

export async function destroy(id) {
    return axios
        .delete('/api/category/' + id)
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            throw error;
        });
}
