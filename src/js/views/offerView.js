import { elements } from './base';
import { formatPrice } from './offerListView';

export const clearOffer = () => {
    elements.offer.innerHTML = '';
    clearReviews();
};

export const clearReviews = () => {
    elements.reviews.innerHTML = '';
};

export const acceptReview = id => {
	const resultsArr = Array.from(document.querySelectorAll('.review__accept'));
	resultsArr.forEach(el => {
		if (el.dataset.revid == id) {
			el.classList.add('reviev__accept--accepted');
		}
	});
};

const createReview = review => `
    <li class="review__item">
        <ul>
            <li class="review__info-item">
                <div class="review__info">
                    <svg class="offer__info-icon review__info-icon--reviewer">
                        <use
                            href="img/ext-icons.svg#icon-contacts-filled"
                        ></use>
                    </svg>
                    <span class="offer__info-data offer__info-data--owner"
                        >${review.author}</span
                    >
                </div>
            </li>
            <li>
                <div class="review__info">
                    <span
                        class="review__info-data offer__info-data--price-sign offer__info-data--price offer__info-data--price-sign-ours"
                        >$</span
                    >
                    <span
                        class="offer__info-data offer__info-data--price offer__info-data--price-ours"
                        >${formatPrice(review.ourPrice, false)}</span
                    >
                    <button class="review__accept ${
						review.accepted ? 'reviev__accept--accepted' : ''
					} btn-tiny btn-tiny--review" data-revid=${review.id}>
                        <svg class="offer__info-icon">
                            <use href="img/ext-icons.svg#icon-checked"></use>
                        </svg>
                    </button>
                </div>
            </li>
            <li>
                <p class="review__description">${review.notes}</p>
            </li>
        </ul>
    </li>
`;

export const renderOffer = offer => {
	const markup = `
        <figure class="offer__fig">
            ${offer.imageUrl != null ? '<img src="' + offer.imageUrl + '" alt="' + offer.name + '" class="offer__img" />' : ''}
            <h1 class="offer__name">
                <span>${offer.name}</span>
            </h1>
            <button class="btn-tiny btn-tiny--edit btn--fig--edit" title="Edit offer">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-settings"></use>
                </svg>
            </button>
            <button class="btn-tiny btn-tiny--edit btn--fig--delete" title="Delete offer">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-remove"></use>
                </svg>
            </button>
        </figure>
        <div class="offer__container">
            <div class="offer__info">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-contacts-filled"></use>
                </svg>
                <span class="offer__info-data offer__info-data--owner">${offer.owner}</span>
            </div>
            <div class="offer__info">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-rating"></use>
                </svg>
                <span class="offer__info-data offer__info-data--id">${offer.id}</span>
            </div>
            <div class="offer__info">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-home"></use>
                </svg>
                <span class="offer__info-data offer__info-data--address"
                    >${offer.street}</span
                >
            </div>
            <div class="offer__info">
                <span
                    class="offer__info-data offer__info-data--price-sign offer__info-data--price offer__info-data--price-sign-owners"
                    >$</span
                >
                <span
                    class="offer__info-data offer__info-data--price offer__info-data--price-owners"
                    >${formatPrice(offer.ownersPrice, false)}</span
                >
            </div>
            <div class="offer__info">
                <span
                    class="offer__info-data offer__info-data--price-sign offer__info-data--price offer__info-data--price-sign-ours"
                    >$</span
                >
                <span
                    class="offer__info-data offer__info-data--price offer__info-data--price-ours"
                    >${
						typeof calcOurPrice(offer) == 'number'
							? formatPrice(calcOurPrice(offer), false)
							: 'N/A'
					}</span
                >
            </div>
        </div>
    `;
    elements.offer.insertAdjacentHTML('afterbegin', markup);
    const reviewsMarkup = `
        <h2 class="heading-2 heading-left">REVIEWS</h2>
        <button class="btn-tiny btn-tiny--edit btn--addrev" title="Add review">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-google-play"></use>
                </svg>
        </button>
        <ul class="review__list">
            ${offer.reviews != null ? offer.reviews.map(review => createReview(review)).join('') : '<p class="review__description">No reviews available...</p>'}
        </ul>
    `;
    elements.reviews.insertAdjacentHTML('afterbegin', reviewsMarkup);
};

export const calcOurPrice = offer => {
	let finalPrice;
	let sum = 0;
	const reviewCount = offer.reviewCount;
	let acceptedCount = 0;

	if (reviewCount != 0 && reviewCount != null) {
		offer.reviews.forEach(review => {
			if (review.accepted) {
				sum += review.ourPrice;
				acceptedCount++;
			}
		});
		finalPrice = Math.round(sum / acceptedCount);
	}
	return finalPrice;
};
