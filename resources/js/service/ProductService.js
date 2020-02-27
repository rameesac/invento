import axios from 'axios';

export async function get() {
    return axios.get('/api/product').then(res => res.data);
}

export async function save(product) {
    return axios
        .post('/api/product', { ...product })
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            throw error;
        });
}

export async function destroy(id) {
    return axios
        .delete('/api/product/' + id)
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            throw error;
        });
}
