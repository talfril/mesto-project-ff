import '../pages/index.css';
import { addCards, addCardToCardsArray, popupAddNewCard } from './card.js';
import { openPopup, closePopup, openPopupByButton, popups } from './modal.js';
import {
  enableValidation,
  validationConfig,
  setEventListeners,
  clearValidation,
} from './validation.js';
import {
  pushMyAuthorizationToServer,
  updateUserAvatar,
  fetchUserDataAndCards,
} from './api.js';
import { renderLoading } from './utils.js';

const popupProfile = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

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

// Изменение профиля
function changeProfile(evt) {
  evt.preventDefault();
  const saveButton = evt.target.querySelector('.popup__button');
  renderLoading(true, saveButton);

  pushMyAuthorizationToServer(
    profileFormName.value,
    profileFormDescription.value
  )
    .then(() => {
      profileName.textContent = profileFormName.value;
      profileDescription.textContent = profileFormDescription.value;
      closePopup(popupProfile);
      profileForm.reset();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, saveButton);
    });
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
  const saveButton = avatarForm.querySelector('.popup__button');
  const avatarUrl = changeAvatarForm.value;
  renderLoading(true, saveButton);

  updateUserAvatar(avatarUrl)
    .then(() => {
      profileImage.style.backgroundImage = `url('${avatarUrl}')`;
      closePopup(popupChangeAvatar);
      avatarForm.reset();
      clearValidation(avatarForm, validationConfig);
      setEventListeners(avatarForm, validationConfig); 
    })
    .catch((error) => {
      console.error('Ошибка при сохранении аватара:', error);
    })
    .finally(() => {
      renderLoading(false, saveButton);
    });
}

//Слушатели на закрытие форм + слушатель постановки лайка
profileForm.addEventListener('submit', changeProfile);
newPlace.addEventListener('submit', addCardToCardsArray);
avatarForm.addEventListener('submit', changeProfileAvatar);

popups.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains('popup__close')
    ) {
      closePopup(popup);
    }
  });
});

//Вызовы функций открытия и закрытия модальных окон
openPopupByButton(addButton, popupAddNewCard);

enableValidation(validationConfig);

fetchUserDataAndCards()
  .then(({ userData, cardsData }) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = userData.avatar;

    addCards(cardsData);
  })
  .catch((error) => {
    console.error('Ошибка при получении данных пользователя:', error);
  });
