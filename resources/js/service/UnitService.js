import axios from 'axios';

export async function get() {
    return axios.get('/api/unit').then(res => res.data);
}

export async function list() {
    return axios.get('/api/unit/list').then(res => res.data);
}
