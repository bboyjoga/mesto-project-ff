//Функции для работы с карточками
import { closePopupEdit, popupImage, closePopupWindow } from "./modal";
// Создание карточки
export function createCard(card, deleteCard, cardLike, popupImage) {
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
  cardImage.addEventListener("click", () => popupImage(cardImage));
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

// Добавление новой карточки
export function createNewCard(evt) {
  evt.preventDefault();
  const popupTypeNewCard = document.querySelector(".popup_type_new-card");
  const cardName = popupTypeNewCard.querySelector(
    ".popup__input_type_card-name"
  );
  const cardUrl = popupTypeNewCard.querySelector(".popup__input_type_url");
  const dataCard = {
    name: cardName.value,
    link: cardUrl.value,
  };
  const newCard = createCard(dataCard, deleteCard, cardLike, popupImage);
  const placesList = document.querySelector(".places__list");
  const addImage = popupTypeNewCard.querySelector(".popup__form");
  placesList.prepend(newCard);
  closePopupWindow(popupTypeNewCard);
  addImage.reset();
}

// Редактирование информации профиля
export function handleFormEditSubmit(evt) {
  const popupTypeEdit = document.querySelector(".popup_type_edit");
  const nameInput = popupTypeEdit.querySelector(".popup__input_type_name");
  const jobInput = popupTypeEdit.querySelector(
    ".popup__input_type_description"
  );
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopupEdit(popupTypeEdit);
}
