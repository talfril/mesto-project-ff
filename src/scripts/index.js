import '../pages/index.css';
import {
  cardsOnPage,
  likeCard,
  addCards,
  addCardToCardsArray,
} from './card.js';
import {
  openPopup,
  closePopup,
  openPopupByButton,
  closePopapByButton,
} from './modal.js';

addCards();

const popupProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeProfilePopupButton = popupProfile.querySelector('.popup__close');
const closeAddPopupButton = popupAddNewCard.querySelector('.popup__close');
const closeImageAsButton = popupImage.querySelector('.popup__close');

const popupImageImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const cardItems = document.querySelectorAll('.card__image');

///Блок отвечающий за сохранение данных в popup 'редактирование профиля'
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.forms.editProfile;
const profileFormName = profileForm.querySelector('.popup__input_type_name');
const profileFormDescription = profileForm.querySelector(
  '.popup__input_type_description'
);

profileFormName.setAttribute('placeholder', profileName.textContent);
profileFormDescription.setAttribute('placeholder',  profileDescription.textContent);

function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
  closePopup(popupProfile);
}

//Слушатели на закрытие форм + слушатель постановки лайка
profileForm.addEventListener('submit', changeProfile);
newPlace.addEventListener('submit', addCardToCardsArray);
cardsOnPage.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('card__like-button')) {
    likeCard(evt);
  }
});

//Вызовы функций открытия и закрытия модальных окон
openPopupByButton(editButton, popupProfile);
openPopupByButton(addButton, popupAddNewCard);
closePopapByButton(closeProfilePopupButton, popupProfile);
closePopapByButton(closeAddPopupButton, popupAddNewCard);
closePopapByButton(closeImageAsButton, popupImage);

//открытие попапа изображения
export function openImagePopup(link, alt) {
  popupImageImage.src = link;
  popupImageImage.alt = alt;
  popupImageCaption.textContent = alt;
  openPopup(popupImage);
}

cardItems.forEach(function (cardItem) {
  cardItem.addEventListener('click', function () {
    openImagePopup(cardItem.src, cardItem.alt);
  });
});
