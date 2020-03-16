import axios from 'axios';

export async function get() {
    return axios.get('/api/stock-ledger').then(res => res.data);
}
