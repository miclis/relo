import { elements } from './base';

export const clearOffers = () => {
	elements.offersResList.innerHTML = '';
	elements.offersResPages.innerHTML = '';
};

export const highlightSelected = id => {
	const resultsArr = Array.from(document.querySelectorAll('.results__link--offer'));
	resultsArr.forEach(el => {
		el.classList.remove('results__link--active');
	});
	const check = document.querySelector(`.results__link[href*="${id}"]`);
	if (check)
		document
			.querySelector(`.results__link[href*="${id}"]`)
			.classList.add('results__link--active');
};

// Cuts the name into words and then joins again until the length is <= limit
export const limitOfferName = (name, limit = 28) => {
	const newName = [];
	if (name.length > limit) {
		name.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				newName.push(cur);
			}
			return acc + cur.length;
		}, 0);
		// Return the result
		return `${newName.join(' ')}...`;
	}
	return name;
};

export const formatPrice = (number, addSign = true) => {
	let st = number.toString();
	const sign = '$';

	if (st.length > 3) {
		st = st.substr(0, st.length - 3) + "'" + st.substr(st.length - 3, st.length);
	}

	return st + ' ' + (addSign ? sign : '');
};

const renderOffer = offer => {
	const markup = `
    <li>
        <a class="results__link results__link--offer" href="#$${offer.id}">
            <figure class="results__fig">
                <img
                    src="${offer.imageUrl}"
                    alt="${offer.name}"
                />
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitOfferName(offer.name)}</h4>
                <p class="results__owner">${offer.owner}</p>
                <p class="results__price">${formatPrice(offer.ownersPrice)}</p>
            </div>
        </a>
    </li>
    `;
	elements.offersResList.insertAdjacentHTML('beforeend', markup);
};

// type : 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${
	type === 'prev' ? page - 1 : page + 1
}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
	const pages = Math.ceil(numResults / resPerPage);

	let button;
	if (page === 1 && pages > 1) {
		// Only button to go to next page
		button = createButton(page, 'next');
	} else if (page < pages) {
		// Both buttons
		button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
	} else if (page === pages && pages > 1) {
		// Only button to go to previous page
		button = createButton(page, 'prev');
	}
	if (numResults > resPerPage) elements.offersResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderOffers = (offers, page = 1, resPerPage = 10) => {
	// Render results of current page
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;

	offers.slice(start, end).forEach(renderOffer);

	// Render pagination buttons
	renderButtons(page, offers.length, resPerPage);
};
