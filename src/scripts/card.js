import { openImagePopup, popupAddNewCard, renderLoading } from './index.js';
import { closePopup } from './modal.js';
import {
  getCardsFromServer,
  pushMyCardToServer,
  currentUserId,
  deleteCardOnServer,
  likeCardOnServer,
  disLikeCardOnServer,
} from './api.js';

export const cardsOnPage = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const newPlace = document.forms.newPlace;
const placeName = newPlace.querySelector('.popup__input_type_card-name');
const placeLink = newPlace.querySelector('.popup__input_type_url');

// Функция создания карточки
function createCard(place, deleteFunction, likeFunction, currentUserId) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  const numberOfLikes = cardItem.querySelector('.likes-number');
  if (place.owner && place.owner._id === currentUserId) {
    deleteButton.style.display = 'block';
  } else {
    deleteButton.style.display = 'none';
  }
  if (place.likes && place.likes.some((user) => user._id === currentUserId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardImage.src = place.link;
  cardImage.alt = 'Фотография с места - ' + place.name;
  cardTitle.textContent = place.name;
  numberOfLikes.textContent = place.likes.length;
  cardItem.dataset.cardId = place._id || '';
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
  const cardId = cardToRemove.dataset.cardId;
  deleteCardOnServer(cardId);
  cardToRemove.remove();
}

// Функция лайка карточки
export function likeCard(evt) {
  const currentCard = evt.target.closest('.card');
  const cardToLike = currentCard.querySelector('.card__like-button');
  const cardId = currentCard.dataset.cardId;
  const isLiked = cardToLike.classList.contains('card__like-button_is-active');
  const likeAction = isLiked ? disLikeCardOnServer : likeCardOnServer;
  likeAction(cardId).then((updatedCard) => {
    cardToLike.classList.toggle('card__like-button_is-active');
    const likesNumberElement = currentCard.querySelector('.likes-number');
    likesNumberElement.textContent = updatedCard.likes.length;
    currentCard.dataset.isLiked = isLiked ? 'false' : 'true';
  });
}

// Вывести карточки на страницу
export function addCards() {
  getCardsFromServer().then((initialCardsFromServer) => {
    initialCardsFromServer.forEach(function (place) {
      const card = createCard(place, deleteCard, likeCard, currentUserId);
      cardsOnPage.appendChild(card);
    });
  });
}

//Добавление новой карточки через попап
export function addCardToCardsArray(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeName.value,
    link: placeLink.value,
    likes: '',
  };
  const newPlaceCard = createCard(newCard, deleteCard, likeCard, currentUserId);
  cardsOnPage.insertBefore(newPlaceCard, cardsOnPage.firstChild);
  const deleteButton = newPlaceCard.querySelector('.card__delete-button');
  deleteButton.style.display = 'block';
  renderLoading(true);
  pushMyCardToServer(placeName.value, placeLink.value).finally(() => {
    newPlace.reset();
    closePopup(popupAddNewCard);
  });
}
