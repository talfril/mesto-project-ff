let FlagPopupIsOpen = false;

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  FlagPopupIsOpen = true;
  closePopapEsc(popup);
  closePopupByOverlay(popup);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
  FlagPopupIsOpen = false;
}

export function closePopapEsc(popup) {
  if (FlagPopupIsOpen) {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        closePopup(popup);
      }
    });
  }
}

export function closePopupByOverlay(popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.currentTarget === evt.target) {
      closePopup(popup);
    }
  });
}

export function openPopupByButton(button, popup) {
  button.addEventListener('click', function () {
    openPopup(popup);
  });
}

export function closePopapByButton(button, popup) {
  button.addEventListener('click', function () {
    closePopup(popup);
  });
}
