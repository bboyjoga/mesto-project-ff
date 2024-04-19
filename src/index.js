import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import {
  createCard,
  cardLike,
  deleteCard,
  createNewCard,
  handleFormEditSubmit,
} from "./components/card";
import {
  popupImage,
  openPopupWindow,
  closePopupWindow,
  openPopupEdit,
  closePopupEdit,
} from "./components/modal";

const placesList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");
const editProfileForm = popupTypeEdit.querySelector(".popup__form");
const addImage = popupTypeNewCard.querySelector(".popup__form");

initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard, cardLike, popupImage));
});

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopupWindow(popup);
    }
  });
});

editProfileButton.addEventListener("click", () => openPopupEdit(popupTypeEdit));
addButton.addEventListener("click", () => openPopupWindow(popupTypeNewCard));

popups.forEach((popup) => {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopupWindow(popup);
    }
  });
});

editProfileForm.addEventListener("submit", handleFormEditSubmit);
addImage.addEventListener("submit", createNewCard);
