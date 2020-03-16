import axios from 'axios';

export async function get() {
    return axios.get('/api/stock_movement').then(res => res.data);
}

export async function save(stock_movement) {
    return axios
        .post('/api/stock_movement', { ...stock_movement })
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            throw error;
        });
}

export async function destroy(id) {
    return axios
        .delete('/api/stock_movement/' + id)
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            throw error;
        });
}
