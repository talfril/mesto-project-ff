import { initialCards } from './cards.js';
import { openImagePopup } from './index.js';

export const cardsOnPage = document.querySelector('.places__list');

//Функция создания карточки
export function createCard(place, deleteFunction, likeFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  cardImage.src = place.link;
  cardImage.alt = 'Фотография с места - ' + place.name;
  cardTitle.textContent = place.name;
  deleteButton.addEventListener('click', deleteFunction);
  return cardItem;
}

//Функция удаления карточки
export function deleteCard(evt) {
  const cardToRemove = evt.target.closest('.card');
  if (cardToRemove) {
    const index = Array.from(cardsOnPage.children).indexOf(cardToRemove);
    cardToRemove.remove();
    if (index !== -1) {
        initialCards.splice(index, 1);
    }
  }
}

//Функция лайка карточки
export function likeCard(evt) {
  const currentCard = evt.target.closest('.card');
  const cardToLike = currentCard.querySelector('.card__like-button');
  cardToLike.classList.toggle('card__like-button_is-active');
}

//Вывести карточки на страницу
export function addCards() {
  while (cardsOnPage.firstChild) {
    cardsOnPage.removeChild(cardsOnPage.firstChild);
  }
  initialCards.forEach(function (place) {
    const card = createCard(place, deleteCard, likeCard);
    cardsOnPage.appendChild(card);

    card.querySelector('.card__image').addEventListener('click', function () {
      openImagePopup(place.link, place.name);
    });
  });
}

//Добавление новой карточки через попап
export function addCardToCardsArray(evt) {
  evt.preventDefault();
  const newPlace = document.forms.newPlace;
  const placeName = newPlace.querySelector('.popup__input_type_card-name');
  const placeLink = newPlace.querySelector('.popup__input_type_url');
  const newCard = {
    name: placeName.value,
    link: placeLink.value,
  };
  initialCards.unshift(newCard);
  document.querySelector('.popup_type_new-card').style.display = 'none';
  newPlace.reset();
  addCards();
}
