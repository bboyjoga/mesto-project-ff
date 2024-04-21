import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { createCard, cardLike, deleteCard } from "./components/card";
import {
  openPopupWindow,
  closePopupWindow,
  closePopupByOverlay,
  closePopupByEsc,
} from "./components/modal";

const placesList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");
const editProfileForm = popupTypeEdit.querySelector(".popup__form");
const addImageForm = popupTypeNewCard.querySelector(".popup__form");
const nameInput = popupTypeEdit.querySelector(".popup__input_type_name");
const jobInput = popupTypeEdit.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard, cardLike, openPopupImage));
});

editProfileButton.addEventListener("click", () => openPopupEdit(popupTypeEdit));
addButton.addEventListener("click", () => openPopupWindow(popupTypeNewCard));

popups.forEach((popup) => {
  closePopupByOverlay(popup);
});

editProfileForm.addEventListener("submit", handleFormEditSubmit);
addImageForm.addEventListener("submit", createNewCard);

// Добавление новой карточки
function createNewCard(evt) {
  evt.preventDefault();
  const cardName = popupTypeNewCard.querySelector(
    ".popup__input_type_card-name"
  );
  const cardUrl = popupTypeNewCard.querySelector(".popup__input_type_url");
  const dataCard = {
    name: cardName.value,
    link: cardUrl.value,
  };
  const newCard = createCard(dataCard, deleteCard, cardLike, openPopupImage);
  placesList.prepend(newCard);
  closePopupWindow(popupTypeNewCard);
  addImageForm.reset();
}

// Редактирование информации профиля
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopupWindow(popupTypeEdit);
}

// Открытие попапа при клике на картинку
function openPopupImage(cardImage) {
  popupTypeImage.querySelector(".popup__image").src = cardImage.src;
  popupTypeImage.querySelector(".popup__image").alt = cardImage.alt;
  popupTypeImage.querySelector(".popup__caption").textContent = cardImage.alt;
  openPopupWindow(popupTypeImage);
}

// Открытие попапа редактирования профиля
function openPopupEdit(popupTypeEdit) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopupWindow(popupTypeEdit);
}
