import axios from 'axios';
import { proxy, token, apiURL, offersURL } from '../config';

export default class OfferList {
	constructor() {}

	async getResults(id) {
		try {
			const res = await axios(`${apiURL}/${token}/${offersURL}/${id}`);
			this.result = res.data.offers;
		} catch (error) {
			console.log(error);
			alert('Something went wrong when getting offers :(');
		}
	}

	async getDefaultResults() {
		try {
			const res = await axios(`${apiURL}/${offersURL}`);
			this.result = res.data.offers;
		} catch (error) {
			console.log(error);
			alert('Something went wrong when getting offers :(');
		}
	}
}