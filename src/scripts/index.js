import '../pages/index.css';
import { addCards, addCardToCardsArray } from './card.js';
import { openPopup, closePopup, openPopupByButton } from './modal.js';
import { enableValidation } from './validation.js';
import {
  uzerAuthorization,
  pushMyAuthorizationToServer,
  changeMyAvatar,
} from './api.js';

addCards();

const popupProfile = document.querySelector('.popup_type_edit');
export const popupAddNewCard = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupImageImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

// Блок отвечающий за сохранение данных в popup 'редактирование профиля'
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.forms.editProfile;
const profileFormName = profileForm.querySelector('.popup__input_type_name');
const profileFormDescription = profileForm.querySelector(
  '.popup__input_type_description'
);

function setProfileFormValues() {
  profileFormName.value = profileName.textContent;
  profileFormDescription.value = profileDescription.textContent;
  const inputEvent = new Event('input', { bubbles: true });
  profileFormName.dispatchEvent(inputEvent);
  profileFormDescription.dispatchEvent(inputEvent);
}

function openProfilePopupByButton() {
  setProfileFormValues();
  openPopup(popupProfile);
}

editButton.addEventListener('click', openProfilePopupByButton);

function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
  pushMyAuthorizationToServer(
    profileFormName.value,
    profileFormDescription.value
  );
  closePopup(popupProfile);
  profileForm.reset();
}

setProfileFormValues();

//Изменение аватара через попап
const profileImage = document.querySelector('.profile__image');
const changeAvatarButton = document.querySelector('.profile__image');
const popupChangeAvatar = document.querySelector('.popup_type_new-avatar');
const avatarForm = document.forms.changeAvatar;
const changeAvatarForm = avatarForm.querySelector(
  '.popup__input_type_avatar_url'
);

changeAvatarButton.addEventListener('click', function () {
  openPopup(popupChangeAvatar);
});

function changeProfileAvatar(evt) {
  evt.preventDefault();
  const avatarUrl = changeAvatarForm.value;
  profileImage.style.backgroundImage = `url('${avatarUrl}')`;
  renderLoading(true);
  changeMyAvatar(avatarUrl).then(() => {
    closePopup(popupChangeAvatar);
    avatarForm.reset();
  });
}

//Слушатели на закрытие форм + слушатель постановки лайка
profileForm.addEventListener('submit', changeProfile);
newPlace.addEventListener('submit', addCardToCardsArray);
avatarForm.addEventListener('submit', changeProfileAvatar);

//Вызовы функций открытия и закрытия модальных окон
openPopupByButton(addButton, popupAddNewCard);

//открытие попапа изображения
export function openImagePopup(link, alt) {
  popupImageImage.src = link;
  popupImageImage.alt = alt;
  popupImageCaption.textContent = alt;
  openPopup(popupImage);
}

//вызов валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});

//работа с сервером
uzerAuthorization()
  .then((userData) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = userData.avatar;
  })
  .catch((error) => {
    console.error('Ошибка получения данных пользователя:', error);
  });

export function renderLoading(isLoading) {
  const activePopup = document.querySelector('.popup.popup_is-opened');
  if (!activePopup) {
    console.error('Ошибка: активный попап не найден.');
    return;
  }
  const popupButton = activePopup.querySelector('.popup__button');
  if (!popupButton) {
    console.error('Ошибка: кнопка внутри активного попапа не найдена.');
    return;
  }
  if (isLoading) {
    popupButton.textContent = 'Сохранение...';
  } else {
    popupButton.textContent = 'Сохранить';
  }
}
