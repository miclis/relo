// Global App Controller
import OfficeList from './models/OfficeList';
import * as officeListView from './views/officeListView';
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
const state = {};

/**
 * OFFICELIST CONTROLLER
 */
const controlOfficeList = async () => {
	// 1. New OfficeList object and add to state
	state.officeList = new OfficeList();

	// 2. Prepare UI for Offices results
	officeListView.clearOffices();
	offerListView.clearOffers();
	offerView.clearOffer();
	renderLoader(elements.officesRes);
	try {
		// 3. Get offices
		await state.officeList.getDefaultResults();
		// await state.offerList.getResults();

		// 4. Render offices
		clearLoader();
		officeListView.renderOffices(state.officeList.result);
	} catch (error) {
		alert('Something went wrong when rendering offices data...');
		console.log(error);
		clearLoader();
	}
};

window.addEventListener('load', controlOfficeList);

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
});

elements.officesResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		officeListView.clearOffices();
		officeListView.renderOffices(state.officeList.result, goToPage);
	}
});

/**
 * OFFERLIST CONTROLLER
 */
const controlOfferList = async () => {
	// Get Office Id from URL
	const id = window.location.hash.replace('#', '');

	// 1. New OfferList object and add to state
	state.offerList = new OfferList();

	// 2. Prepare UI for Offers results
	offerListView.clearOffers();
	offerView.clearOffer();
	renderLoader(elements.offersRes);

	// 3. Highlight selected offer item
	if (state.officeList) officeListView.highlightSelected(id);

	try {
		// 3. Get offers
		await state.offerList.getDefaultResults();
		// await state.offerList.getResults(id);

		// 4. Render offices
		clearLoader();
		offerListView.renderOffers(state.offerList.result);
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
		var regexOffices = /#[^\$]/;
		var regexOffers = /#\$/;

		if (window.location.hash.match(regexOffices)) {
			controlOfferList();
		} else if (window.location.hash.match(regexOffers)) {
			controlOffer();
		}
	})
);

const acceptReview = async id => {
	// id from event
	try {
		// 1. Send accepted request to API, wait for response
		await state.offer.acceptReview(id);

		if (!state.offer.acceptReviewStatus)
			throw new Error(`Server responded with: ${state.offer.acceptReviewStatus}`);

		// 2. Accept state value
		state.offer.result.reviews.forEach(review => {
			if (review.id == id) review.accepted = true;
		});

		// 3. Render changes on UI (change icon to green, adjust our price)
		offerView.acceptReview(id);
		offerView.adjustOurPrice(state.offer.result);

	} catch (error) {
		alert('Could not update review status on the server...');
		console.log(error);
	}
};

elements.offer.addEventListener('click', e => {
	const btn = e.target.closest('.btn-tiny');

	if (btn) {
		if (!btn.classList.contains('reviev__accept--accepted') ? true : false) {
			const reviewId = btn.dataset.revid;
			acceptReview(reviewId);
		}
	}
});
