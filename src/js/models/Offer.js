import axios from 'axios';
import { proxy, token, apiURL, offerURL, deleteOfferURL, submitOfferURL, editOfferURL, submitReviewURL} from '../config';

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

	async deleteOffer(id) {
		this.deleteStatus = null;
		try {
			const res = await axios.post(`${apiURL}/${deleteOfferURL}`,
			{
				"id": id
			});
			this.deleteStatus = res.status;
		} catch (error) {
			console.log(error);
		}
	}

	async submitOffer() {
		this.submitStatus = null;
		try {
			// Has to respond with ID of newly created offer!
			const res = await axios.post(`${apiURL}/${submitOfferURL}`, this);
			this.submitStatus = res.status;
			this.id = res.data.id;
		} catch (error) {
			console.log(error);
		}
	}

	async submitEditOffer() {
		this.editStatus = null;
		try {
			const res = await axios.post(`${apiURL}/${editOfferURL}`, this);
			this.editStatus = res.status;
		} catch (error) {
			console.log(error);
		}
	}

	async submitReview(data) {
		this.reviewSubmitStatus = null;
		try {
			const res = await axios(`${apiURL}/${submitReviewURL}`, data);
			this.reviewSubmitStatus = res.status;
		} catch (error) {
			console.log(error);
		}
	}
}