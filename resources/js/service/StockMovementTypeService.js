import axios from 'axios';

export async function get() {
    return axios.get('/api/stock_movement_type').then(res => res.data);
}

export async function list() {
    return axios.get('/api/stock_movement_type/list').then(res => res.data);
}
