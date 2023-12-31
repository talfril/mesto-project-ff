import { closePopup, openImagePopup } from './modal.js';
import {
  pushMyCardToServer,
  currentUserId,
  deleteCardOnServer,
  likeCardOnServer,
  disLikeCardOnServer,
} from './api.js';
import { renderLoading } from './utils.js';
import {
  validationConfig,
  setEventListeners,
  clearValidation,
} from './validation.js';

export const cardsOnPage = document.querySelector('.places__list');
export const popupAddNewCard = document.querySelector('.popup_type_new-card');

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

  const cardId = place._id || '';
  cardItem.dataset.cardId = cardId;

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
  deleteButton.addEventListener('click', deleteFunction);
  cardLikeButton.addEventListener('click', function () {
    likeFunction(cardId);
  });
  cardImage.addEventListener('click', function () {
    openImagePopup(place.link, place.name);
  });

  return cardItem;
}

// Функция удаления карточки
function deleteCard(evt) {
  const cardToRemove = evt.target.closest('.card');
  const cardId = cardToRemove.dataset.cardId;
  deleteCardOnServer(cardId)
    .then(() => {
      cardToRemove.remove();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// Функция лайка/дизлайка карточки
export function likeCard(cardId) {
  const currentCard = document.querySelector(`.card[data-card-id='${cardId}']`);
  const cardToLike = currentCard.querySelector('.card__like-button');
  const isLiked = cardToLike.classList.contains('card__like-button_is-active');
  const likeAction = isLiked ? disLikeCardOnServer : likeCardOnServer;
  likeAction(cardId)
    .then((updatedCard) => {
      cardToLike.classList.toggle('card__like-button_is-active');
      const likesNumberElement = currentCard.querySelector('.likes-number');
      likesNumberElement.textContent = updatedCard.likes.length;
      currentCard.dataset.isLiked = isLiked ? 'false' : 'true';
    })
    .catch((err) => {
      console.log(`Ошибка при обработке лайка/дизлайка: ${err}`);
    });
}

// Вывести карточки на страницу
export function addCards(cardsData) {
  cardsData.forEach(function (place) {
    const card = createCard(place, deleteCard, likeCard, currentUserId);
    cardsOnPage.appendChild(card);
  });
}

// Добавление новой карточки через попап
export function addCardToCardsArray(evt) {
  evt.preventDefault();
  const saveButton = evt.submitter;
  renderLoading(true, saveButton);
  pushMyCardToServer(placeName.value, placeLink.value)
    .then((addedCard) => {
      const newPlaceCard = createCard(
        addedCard,
        deleteCard,
        likeCard,
        currentUserId
      );
      cardsOnPage.insertBefore(newPlaceCard, cardsOnPage.firstChild);
      newPlace.reset();
      clearValidation(newPlace, validationConfig);
       closePopup(popupAddNewCard);
    })
    .catch((error) => {
      console.error('Ошибка при добавлении карточки:', error);
    })
    .finally(() => {
      renderLoading(false, saveButton);
    });
}
