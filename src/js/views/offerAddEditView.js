import { elements } from './base';

export const inputFields = {
	imageUrl: 'input__field--imageUrl',
	name: 'input__field--name',
	owner: 'input__field--owner',
	street: 'input__field--street',
	postalCode: 'input__field--postalCode',
	city: 'input__field--city',
	ownersPrice: 'input__field--ownersPrice'
};

export const renderAddEditOffer = offer => {
	const isEdit = offer != null;
	const markup = `
        <figure class="offer__fig"></figure>
        <div class="offer__container offer__container--add-edit">
            <div class="offer__info--file disabled">
                <form action="">
                    <input type="file" name="file" id="file" class="inputfile" />
                    <label for="file">Upload image</label>
                </form>
            </div>
            <div class="offer__info">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-google-play"></use>
                </svg>
                <form class="input">
                    <input type="text" class="input__field input__field--imageUrl" placeholder="Image URL" value="${
						isEdit ? offer.imageUrl : ''
					}"/>
                </form>
            </div>
            <div class="offer__info">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-palace"></use>
                </svg>
                <form class="input">
                    <input type="text" class="input__field input__field--name" placeholder="Property Name" value="${
						isEdit ? offer.name : ''
					}"/>
                </form>
            </div>
            <div class="offer__info">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-contacts-filled"></use>
                </svg>
                <form class="input">
                    <input
                        type="text"
                        class="input__field input__field--owner"
                        placeholder="Owner's Name & Last Name" value="${isEdit ? offer.owner : ''}"
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
                        class="input__field input__field--street"
                        placeholder="Address (Street)" value="${isEdit ? offer.street : ''}"
                    />
                </form>
            </div>
            <div class="offer__info offer__info--address-part">
                <form class="input">
                    <input
                        type="text"
                        class="input__field input__field--postalCode"
                        placeholder="Address (Postal Code)" value="${
							isEdit ? offer.postalCode : ''
						}"
                    />
                </form>
            </div>
            <div class="offer__info offer__info--address-part">
                <form class="input">
                    <input type="text" class="input__field input__field--city" placeholder="Address (City)" value="${
						isEdit ? offer.city : ''
					}"/>
                </form>
            </div>
            <div class="offer__info">
                <span
                    class="offer__info-data offer__info-data--price-sign offer__info-data--price-sign-owners"
                    >$</span
                >
                <form class="input">
                    <input type="number" class="input__field input__field--ownersPrice" placeholder="Owner's Price" value="${
						isEdit ? offer.ownersPrice : ''
					}"/>
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
