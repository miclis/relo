export const elements = {
	searchForm: document.querySelector('.search'),
	searchInput: document.querySelector('.search__field'),
	officesRes: document.querySelector('.offices'),
	officesResList: document.querySelector('.results__list--offices'),
    officesResPages: document.querySelector('.results__pages--offices'),
    offersRes: document.querySelector('.offers'),
	offersResList: document.querySelector('.results__list--offers'),
	offersResPages: document.querySelector('.results__pages--offers'),
	offer: document.querySelector('.offer')
};

export const elementStrings = {
	loader: 'loader'
};

export const renderLoader = parent => {
	const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
	parent.insertAdjacentHTML('beforeend', loader);
};

export const clearLoader = () => {
	const loader = document.querySelector(`.${elementStrings.loader}`);
	if (loader) loader.parentElement.removeChild(loader);
};