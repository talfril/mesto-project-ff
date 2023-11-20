export function modalWindows(){

///Блок отвечающий за открытие и закрытие модальных окон

  const popupProfile = document.querySelector('.popup_type_edit');
  const popupAddNewCard = document.querySelector('.popup_type_new-card');
  const popupImage = document.querySelector('.popup_type_image');

  let FlagPopupIsOpen = false;
  
  const editButton = document.querySelector('.profile__edit-button');
  const addButton = document.querySelector('.profile__add-button');
  const closeProfilePopupButton = popupProfile.querySelector('.popup__close');
  const closeAddPopupButton = popupAddNewCard.querySelector('.popup__close');
  const closeImageAsButton = popupImage.querySelector('.popup__close');
  
function openPopup(popup) {
    popup.style.display = 'flex';
    FlagPopupIsOpen = true;
    closePopapEsc(popup);
    closePopupByOverlay(popup)
  };
  
function closePopup(popup) {
    popup.style.display = 'none';
    FlagPopupIsOpen = false;
  };
  
function closePopapEsc(popup){
    if (FlagPopupIsOpen){
      document.addEventListener("keydown", function(evt){
        if (evt.key === 'Escape') {
          closePopup(popup);
        }
      })
    }
  }

  function closePopupByOverlay(popup){
    popup.addEventListener("click", function(evt){
      if (evt.currentTarget === evt.target) {
        closePopup(popup)
      }
    })
  }

function openPopupByButton(button, popup){
  button.addEventListener('click', function() {
    openPopup(popup);
  })
}

function closePopapByButton(button, popup){
  button.addEventListener('click', function() {
    closePopup(popup);
  })};
  
 
openPopupByButton(editButton, popupProfile);
openPopupByButton(addButton, popupAddNewCard);
// openPopupByButton(imageAsButton, popupImage); пока не открываем изображение, нужно переработать это место

closePopapByButton(closeProfilePopupButton, popupProfile);
closePopapByButton(closeAddPopupButton, popupAddNewCard);
closePopapByButton(closeImageAsButton, popupImage);

///Блок отвечающий за сохранение данных в popup "редактирование профиля"
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.forms.editProfile;
const profileFormName = profileForm.querySelector('.popup__input_type_name');
const profileFormDescription = profileForm.querySelector('.popup__input_type_description');

profileFormName.setAttribute('placeholder', profileName.textContent);
profileFormDescription.setAttribute('placeholder', profileDescription.textContent);

function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
  closePopup(popupProfile);
}

profileForm.addEventListener('submit', changeProfile); 


//Рабочее место, сейчас тут работа над кодом открытия попапа изображения
const popupImageImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const cardItems = document.querySelectorAll('.card__image');

function openImagePopup(link, alt) {
    popupImageImage.src = link;
    popupImageImage.alt = alt;
    popupImageCaption.textContent = alt;
    openPopup(popupImage);
}

cardItems.forEach(function(cardItem) {
    cardItem.addEventListener('click', function() {
        openImagePopup(cardItem.src, cardItem.alt);
    });
});

}

