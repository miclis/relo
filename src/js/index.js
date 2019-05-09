// Global App Controller
import OfferList from './models/OfferList';
import * as offerListView from './views/offerListView';
import Offer from './models/Offer';
import * as offerView from './views/offerView';

import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - OfficeList object
 * - OfferList object
 * - Offer object (includes Reviews)
 */
const state = {
	offerListLoaded: false
};

/**
 * OFFERLIST CONTROLLER
 */
const controlOfferList = async () => {
	// 1. New OfferList object and add to state
	state.offerList = new OfferList();

	// 2. Prepare UI for Offers results
	offerListView.clearOffers();
	renderLoader(elements.offersRes);

	try {
		// 3. Get offers
		await state.offerList.getDefaultResults();

		// 4. Render offers
		clearLoader();
		offerListView.renderOffers(state.offerList.result);

		const id = window.location.hash.slice(10, 15);
		offerListView.highlightSelected(id);
	} catch (error) {
		alert('Something went wrong when rendering offers data...');
		console.log(error);
		clearLoader();
	}
};

elements.offersResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		offerListView.clearOffers();
		offierListView.renderOffers(state.offerList.result, goToPage);
	}
});

window.addEventListener('load', () => {
	state.offerListLoaded = true;
	controlOfferList();
});

/**
 * OFFER CONTROLLER
 */
const controlOffer = async () => {
	// 1. Get Id from URL
	const id = window.location.hash.replace('#$', '');

	if (id) {
		// 2. Prepare UI for changes
		offerView.clearOffer();
		renderLoader(elements.offer);

		// 3. Highlight selected offer item
		if (state.offerList) offerListView.highlightSelected(id);

		// 4. Create new offer object
		state.offer = new Offer(id);

		try {
			// 5. Get Offer data
			await state.offer.getDefaultOffer();
			// await state.offer.getOffer(id);

			// 6. Render Offer
			clearLoader();
			offerView.renderOffer(state.offer.result);
		} catch (error) {
			alert('Something went wrong when rendering offer...');
			console.log(error);
		}
	}
};

['hashchange', 'load'].forEach(event =>
	window.addEventListener(event, function() {
		const id = window.location.hash.slice(10, 15);

		controlOffer();
		offerListView.highlightSelected(id);
	})
);

const deleteOffer = async () => {
	// Id from state
	const id = state.offer.id;
	try {
		// 1. Send delete request to API, wait for response
		await state.offer.deleteOffer(id);

		if (!state.offer.deleteStatus)
			throw new Error(`Server responded with: ${state.offer.deleteStatus}`);

		// 2. Delete offer from state
		state.offer = null;

		// 3. Render changes on UI (clear offer box, reload offer list)
		offerView.clearOffer();
		controlOfferList();
	} catch (error) {
		alert('Could not delete offer from the server...');
		console.log(error);
	}
};

elements.offer.addEventListener('click', e => {
	const btn = e.target.closest('.btn--fig--delete');

	if (btn) {
		deleteOffer();
	}
});

/*
elements.offer.addEventListener('click', e => {
	const btn = e.target.closest('.btn-tiny');

	if (btn) {
		if (!btn.classList.contains('reviev__accept--accepted') ? true : false) {
			const reviewId = btn.dataset.revid;
			acceptReview(reviewId);
		}
	}
});
*/
