// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 


// @todo: DOM узлы
const cardsOnPage = document.querySelector('.places__list');


// @todo: Функция создания карточки
function createCard(place, deleteFunction){
        const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
        const deleteButton = cardItem.querySelector('.card__delete-button');
        const cardImage = cardItem.querySelector('.card__image');
        const cardTitle = cardItem.querySelector('.card__title');
        cardImage.src = place.link;
        cardImage.alt = 'Фотография с места - ' + place.name;
        cardTitle.textContent = place.name;
        deleteButton.addEventListener('click', deleteCard);
        return cardItem;
    };


// @todo: Функция удаления карточки
function deleteCard(evt){
    const cardToRemove = evt.target.closest('.card');
    cardToRemove.remove();
}

// @todo:addCards Вывести карточки на страницу
function addCards() {
    initialCards.forEach(function(place) {
    cardsOnPage.append(createCard(place, deleteCard)); 
})
}

addCards();
