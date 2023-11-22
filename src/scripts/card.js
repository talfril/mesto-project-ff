import { initialCards } from './cards.js';
import { openImagePopup, popupAddNewCard } from './index.js';
import { closePopup } from './modal.js';

export const cardsOnPage = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const newPlace = document.forms.newPlace;
const placeName = newPlace.querySelector('.popup__input_type_card-name');
const placeLink = newPlace.querySelector('.popup__input_type_url');

//Функция создания карточки
function createCard(place, deleteFunction, likeFunction) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  cardImage.src = place.link;
  cardImage.alt = 'Фотография с места - ' + place.name;
  cardTitle.textContent = place.name;
  deleteButton.addEventListener('click', deleteFunction);
  cardLikeButton.addEventListener('click', likeFunction);
  cardImage.addEventListener('click', function () {
    openImagePopup(place.link, place.name);
  });
  return cardItem;
}

//Функция удаления карточки
function deleteCard(evt) {
  const cardToRemove = evt.target.closest('.card');
  cardToRemove.remove();
}

//Функция лайка карточки
export function likeCard(evt) {
  const currentCard = evt.target.closest('.card');
  const cardToLike = currentCard.querySelector('.card__like-button');
  cardToLike.classList.toggle('card__like-button_is-active');
}

//Вывести карточки на страницу
export function addCards() {
  initialCards.forEach(function (place) {
    const card = createCard(place, deleteCard, likeCard);
    cardsOnPage.appendChild(card);
  });
}

//Добавление новой карточки через попап
export function addCardToCardsArray(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeName.value,
    link: placeLink.value,
  };
  const newPlaceCard = createCard(newCard, deleteCard, likeCard);
  cardsOnPage.insertBefore(newPlaceCard, cardsOnPage.firstChild);
  newPlace.reset();
  closePopup(popupAddNewCard);
}
