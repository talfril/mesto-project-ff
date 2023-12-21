export function renderLoading(isLoading, button) {
    if (button && button.classList.contains('popup__button')) {
      const buttonText = isLoading ? 'Сохранение...' : 'Сохранить';
      button.textContent = buttonText;
    }
  }