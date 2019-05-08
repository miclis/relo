import axios from 'axios';
import { proxy, token, apiURL, officesURL  } from '../config';

export default class OfficeList {
	constructor() {}

	async getResults() {
		try {
			const res = await axios(`${apiURL}/${token}/${officesURL}`);
			this.result = res.data.offices;
		} catch (error) {
			console.log(error);
			alert('Something went wrong when getting offices :(');
		}
	}

	async getDefaultResults() {
		try {
			const res = await axios(`${apiURL}/${officesURL}`);
			this.result = res.data.offices;
		} catch (error) {
			console.log(error);
			alert('Something went wrong when getting offices :(');
		}
	}
}
