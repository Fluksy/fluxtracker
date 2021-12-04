import * as axios from 'axios';

const apiElrond = axios.create({
	baseURL: 'https://api.elrond.com'
})

export default apiElrond;
