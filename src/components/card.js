//Функции для работы с карточками
// Создание карточки
export function createCard(card, deleteCard, cardLike, openPopupImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const like = cardElement.querySelector(".card__like-button");
  cardImage.alt = card.name;
  cardImage.src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;
  deleteCardButton.addEventListener("click", () => deleteCard(cardElement));
  cardImage.addEventListener("click", () => openPopupImage(cardImage));
  like.addEventListener("click", () => cardLike(like));
  return cardElement;
}

// Лайк карточки
export function cardLike(like) {
  like.classList.toggle("card__like-button_is-active");
}

// Удаление карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}
