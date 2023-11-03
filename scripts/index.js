// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 


// @todo: DOM узлы
const cardsOnPage = document.querySelector('.places__list');


// @todo: Функция создания карточки
function renderHasCards(place, deleteFunction) {
    initialCards.forEach(function(place) {
        const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
        const deleteButton = cardItem.querySelector('.card__delete-button');
        let cardImage = cardItem.querySelector('.card__image');
        let cardTitle = cardItem.querySelector('.card__title');
        cardImage.src = place.link;
        cardTitle.textContent = place.name;
        cardsOnPage.append(cardItem); 
        deleteButton.addEventListener('click', renderNoCard);
    });
};

// @todo: Функция удаления карточки
function renderNoCard(evt){
    const cardToRemove = evt.target.closest('.card');
    cardToRemove.remove();
};

// @todo: Вывести карточки на страницу
renderHasCards();





