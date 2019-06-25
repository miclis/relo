import axios from 'axios';
import { proxy, token, apiURL, offerURL, deleteOfferURL, submitOfferURL, editOfferURL, submitReviewURL, reviewsURL } from '../config';

export default class Offer {
	constructor(id) {
		this.id = id;
	}

	async getOffer(id) {
		try {
			const res = await axios(`${apiURL}/${offerURL}?offerId=${id}`); //to be changed
			this.result = res.data;
		} catch (error) {
			alert('Something went wrong when getting offer info...');
			console.log(error);
			throw new Error('Failed to get offer...');
		}
		// Reviews
		
			const reviewRes = await axios(`${apiURL}/${reviewsURL}?offerId=${id}`); // to be changed
			this.result.reviews = reviewRes.data;
		
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
			const res = await axios.delete(`${apiURL}/${deleteOfferURL}`, {
				params: {
					offerId: id // to be changed
				}
			});
			this.deleteStatus = res.status;
		} catch (error) {
			console.log(error);
		}
	}

	async submitOffer() {
		this.submitStatus = null;
		this.officeId = '000001';
		try {
			const res = await axios.post(`${apiURL}/${submitOfferURL}`, this);
			this.submitStatus = res.status;
		} catch (error) {
			console.log(error);
		}
	}

	async submitEditOffer() {
		this.editStatus = null;
		this.offerId = this.id;
		this.officeId = '000001';
		console.log(this);
		try {
			const res = await axios.put(`${apiURL}/${editOfferURL}`, this);
			this.editStatus = res.status;
		} catch (error) {
			console.log(error);
		}
	}

	async submitReview(data) {
		this.reviewSubmitStatus = null;
		data.offerId = this.result.offerId;
		data.accepted = false;
		console.log(this.result);
		console.log(data);
		try {
			const res = await axios.post(`${apiURL}/${submitReviewURL}`, data);
			this.reviewSubmitStatus = res.status;
		} catch (error) {
			console.log(error);
		}
	}
}