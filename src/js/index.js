// Global App Controller
import OfferList from './models/OfferList';
import * as offerListView from './views/offerListView';
import Offer from './models/Offer';
import * as offerView from './views/offerView';
import * as offerAddEditView from './views/offerAddEditView';

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

		// 5. Highlight selected offer
		const id = window.location.hash.slice(10, 15);
		if (id) offerListView.highlightSelected(id);
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
const controlOffer = async id => {
	if (id) {
		// 1. Prepare UI for changes
		offerView.clearOffer();
		renderLoader(elements.offer);

		// 2. Create new offer object
		state.offer = new Offer(id);

		try {
			// 3. Get Offer data
			await state.offer.getDefaultOffer();
			// await state.offer.getOffer(id);

			// 4. Render Offer
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

		controlOffer(id);
		if (id) offerListView.highlightSelected(id);
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

		// 4. Clear hash
		window.location.hash = '';
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

const handleFileSelect = async event => {
	var files = event.target.files; // FileList object

	// Get file
	const f = files[0];

	try {
		// Only process image files.
		if (!f.type.match('image.*')) {
			throw new Error('Selected file was not an image...');
		}

		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				let innerHtml = elements.offer.innerHTML;

				// Selection indication
				innerHtml = innerHtml.replace(
					`<label for="file">Upload image</label>`,
					`<label for="file">${theFile.name}</label>`
				);

				// Render new image
				innerHtml = innerHtml.replace(
					`<figure class="offer__fig"></figure>`,
					`<figure class="offer__fig">
					<img src="${e.target.result}" alt="${escape(theFile.name)}" class="offer__img" />
				</figure>`
				);
				elements.offer.innerHTML = innerHtml;
			};
		})(f);

		// Read in the image file as a data URL.
		await reader.readAsDataURL(f);
		state.offer.image = reader;
		console.log(state.offer.image);
	} catch (error) {
		alert('Incorrect file type!');
		console.log(error);
	}
};

elements.offer.addEventListener(
	'change',
	e => {
		const btn = e.target.closest('.inputfile');

		if (btn) {
			handleFileSelect(e);
		}
	},
	false
);

const addOffer = () => {
	// Check if form not in place already
	if (state.offer == null || state.offer.id != null) {
		// 1. Create offer in state
		state.offer = new Offer(null);

		// 2. Clear placeholder
		offerView.clearOffer();

		// 3. Clear url
		window.location.hash = '';

		// 4. Render input fields
		offerAddEditView.renderAddEditOffer();
	}
};

elements.addButton.addEventListener('click', e => {
	addOffer();
});

const submitOffer = async () => {
	// 1. Get data
	state.offer.imageUrl = elements.offer.getElementsByClassName(
		offerAddEditView.inputFields.imageUrl
	)[0].value;
	state.offer.name = elements.offer.getElementsByClassName(
		offerAddEditView.inputFields.name
	)[0].value;
	state.offer.owner = elements.offer.getElementsByClassName(
		offerAddEditView.inputFields.owner
	)[0].value;
	state.offer.street = elements.offer.getElementsByClassName(
		offerAddEditView.inputFields.street
	)[0].value;
	state.offer.postalCode = elements.offer.getElementsByClassName(
		offerAddEditView.inputFields.postalCode
	)[0].value;
	state.offer.city = elements.offer.getElementsByClassName(
		offerAddEditView.inputFields.city
	)[0].value;
	state.offer.ownersPrice = elements.offer.getElementsByClassName(
		offerAddEditView.inputFields.ownersPrice
	)[0].value;

	// 2. Submit offer to server
	try {
		// Check if fields are not empty
		if (
			!state.offer.name ||
			!state.offer.owner ||
			!state.offer.street ||
			!state.offer.postalCode ||
			!state.offer.city ||
			!state.offer.ownersPrice
		) {
			alert('Add missing fields');
			throw new Error('Add missing fields.');
		}
		// 3. Send submit request to API, wait for response
		await state.offer.submitOffer();

		if (!state.offer.submitStatus)
			throw new Error(`Server responded with: ${state.offer.deleteStatus}`);

		// 4. Render changes on UI (clear addEdit view & render offer)
		offerView.clearOffer();
		offerView.renderOffer(state.offer);

		// 5. Set hash
		window.location.hash = `?offerId=${state.offer.id}`;
	} catch (error) {
		alert('Could not submit offer to the server...');
		console.log(error);
	}
};

elements.offer.addEventListener('click', event => {
	const btn = event.target.closest('.btn--submit');

	if (btn) {
		submitOffer();
	}
});
