import axios from 'axios';

export async function get() {
    return axios.get('/api/stock').then(res => res.data);
}
