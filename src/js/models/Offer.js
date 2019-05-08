import axios from 'axios';
import { proxy, token, apiURL, offerURL, acceptReviewURL } from '../config';

export default class Offer {
	constructor(id) {
		this.id = id;
	}

	async getOffer(id) {
		try {
			const res = await axios(`${apiURL}/${token}/${offerURL}/${id}`);
			this.result = res.data;
		} catch (error) {
			alert('Something went wrong when getting offer info...');
			console.log(error);
			throw new Error('Failed to get offer...');
		}
	}

	async getDefaultOffer() {
		try {
            const res = await axios(`${apiURL}/${offerURL}`);
            this.result = res.data;
		} catch (error) {
			alert('Something went wrong when getting offer info...');
			console.log(error);
			throw new Error('Failed to get offer...');
		}
	}

	async acceptReview(id) {
		this.acceptReviewStatus = false;
		try {
			const res = await axios.post(`${apiURL}/${acceptReviewURL}`, 
			{
				"id": id,
				"accepted": true
			});
			this.acceptReviewStatus = res.status;
		} catch (error) {
			console.log(error);
		}
	}
}
