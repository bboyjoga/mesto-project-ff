const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, deleteCard) {
   const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
   const deleteCardButton = cardElement.querySelector('.card__delete-button');
   cardElement.querySelector('.card__image').src = card.link;
   cardElement.querySelector('.card__title').textContent = card.name;
   deleteCardButton.addEventListener('click', () => deleteCard(cardElement));
   return cardElement;
}

function deleteCard(cardElement) {
   cardElement.remove();
}
initialCards.forEach((card) => {
   placesList.append(createCard(card, deleteCard))
});