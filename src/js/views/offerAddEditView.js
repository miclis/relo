import { elements } from './base';
import { formatPrice } from './offerListView';

export const renderAddEditOffer = offer => {
	const markup = `
        <figure class="offer__fig"></figure>
        <div class="offer__container offer__container--add-edit">
            <div class="offer__info--file">
                <form action="">
                    <input type="file" name="file" id="file" class="inputfile" />
                    <label for="file">Upload image</label>
                </form>
            </div>
            <div class="offer__info">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-palace"></use>
                </svg>
                <form class="input">
                    <input type="text" class="input__field" placeholder="Property Name" />
                </form>
            </div>
            <div class="offer__info">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-contacts-filled"></use>
                </svg>
                <form class="input">
                    <input
                        type="text"
                        class="input__field"
                        placeholder="Owner's Name & Last Name"
                    />
                </form>
            </div>
            <div class="offer__info">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-home"></use>
                </svg>
                <form class="input">
                    <input
                        type="text"
                        class="input__field"
                        placeholder="Address (Street)"
                    />
                </form>
            </div>
            <div class="offer__info offer__info--address-part">
                <form class="input">
                    <input
                        type="text"
                        class="input__field"
                        placeholder="Address (Postal Code)"
                    />
                </form>
            </div>
            <div class="offer__info offer__info--address-part">
                <form class="input">
                    <input type="text" class="input__field" placeholder="Address (City)" />
                </form>
            </div>
            <div class="offer__info">
                <span
                    class="offer__info-data offer__info-data--price-sign offer__info-data--price-sign-owners"
                    >$</span
                >
                <form class="input">
                    <input type="text" class="input__field" placeholder="Owner's Price" />
                </form>
            </div>
            <div class="offer__info">
                <button class="btn--submit">
                    <span>Submit</span>
                </button>
            </div>
        </div>
    `;
	elements.offer.insertAdjacentHTML('afterbegin', markup);
};