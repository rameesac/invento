import axios from 'axios';

export async function get() {
    return axios.get('/api/purchase').then(res => res.data);
}

export async function save(purchase) {
    return axios
        .post('/api/purchase', { ...purchase })
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            throw error;
        });
}

export async function destroy(id) {
    return axios
        .delete('/api/purchase/' + id)
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            throw error;
        });
}
