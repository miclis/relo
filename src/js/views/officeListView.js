import { elements } from './base';

export const clearOffices = () => {
	elements.officesResList.innerHTML = '';
	elements.officesResPages.innerHTML = '';
};

export const highlightSelected = id => {
	const resultsArr = Array.from(document.querySelectorAll('.results__link--office'));
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
export const limitOfficeName = (name, limit = 24) => {
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

const renderOffice = office => {
	const markup = `
		<li>
			<a class="results__link results__link--office" href="#${office.id}">
				<div class="results__data">
					<h4 class="results__name">${limitOfficeName(office.name)}</h4>
					<p class="results__city">${office.city}</p>
					<p class="results__country">${office.country}</p>
				</div>
			</a>
		</li>
    `;
	elements.officesResList.insertAdjacentHTML('beforeend', markup);
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
	if (numResults > resPerPage) elements.officesResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderOffices = (offices, page = 1, resPerPage = 10) => {
	// Render results of current page
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;

	offices.slice(start, end).forEach(renderOffice);

	// Render pagination buttons
	renderButtons(page, offices.length, resPerPage);
};
