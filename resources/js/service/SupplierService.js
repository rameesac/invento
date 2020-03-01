import axios from 'axios';

export async function get() {
    return axios.get('/api/supplier').then(res => res.data);
}

export async function list() {
    return axios.get('/api/supplier/list').then(res => res.data);
}

export async function save(supplier) {
    return axios
        .post('/api/supplier', { ...supplier })
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            throw error;
        });
}

export async function destroy(id) {
    return axios
        .delete('/api/supplier/' + id)
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            throw error;
        });
}
