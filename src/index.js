import "./pages/index.css";
import { createCard } from "./components/card";
import { openPopupWindow, closePopupWindow } from "./components/modal";
import {
  enableValidation,
  validationConfig,
  clearValidation,
} from "./components/validation";
import {
  getUser,
  getCards,
  patchProfile,
  createCardPost,
  patchAvatar,
} from "./components/api";

const placesList = document.querySelector(".places__list");
const buttonAddProfile = document.querySelector(".profile__add-button");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const popupOpenTypeEdit = document.querySelector(".popup_type_edit");
const popupOpenTypeNewCard = document.querySelector(".popup_type_new-card");
const popupOpenTypeImage = document.querySelector(".popup_type_image");
const formAddTypeEdit = popupOpenTypeEdit.querySelector(".popup__form");
const formAddImage = popupOpenTypeNewCard.querySelector(".popup__form");
const buttonEditAvatar = document.querySelector(".profile__image");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const formAddAvatar = popupEditAvatar.querySelector(".popup__form");
const nameInput = popupOpenTypeEdit.querySelector(".popup__input_type_name");
const jobInput = popupOpenTypeEdit.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const avatarUrl = popupEditAvatar.querySelector(".popup__input_type_url");
const cardName = popupOpenTypeNewCard.querySelector(
  ".popup__input_type_card-name"
);
const cardUrl = popupOpenTypeNewCard.querySelector(".popup__input_type_url");
const popupImage = popupOpenTypeImage.querySelector(".popup__image");

//Замена аватарки
function replaceAvatar(evt) {
  evt.preventDefault();
  renderLoading(popupEditAvatar, true);
  patchAvatar({ avatar: avatarUrl.value })
    .then((response) => {
      profileImage.style.backgroundImage = `url(${response.avatar})`;
      closePopupWindow(popupEditAvatar);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(popupEditAvatar, false);
    });
}

// Добавление новой карточки
function createNewCard(evt) {
  evt.preventDefault();
  renderLoading(popupOpenTypeNewCard, true);
  createCardPost({ name: cardName.value, link: cardUrl.value })
    .then((response) => {
      const dataCard = {
        name: response.name,
        link: response.link,
        cardid: response._id,
        likes: response.likes,
      };
      const newCard = createCard(dataCard, openPopupImage);
      placesList.prepend(newCard);
      closePopupWindow(popupOpenTypeNewCard);
      formAddImage.reset();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(popupOpenTypeNewCard, false);
    });
}

// Редактирование информации профиля
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  renderLoading(popupOpenTypeEdit, true);
  patchProfile({ name: nameInput.value, about: jobInput.value })
    .then((response) => {
      profileTitle.textContent = response.name;
      profileDescription.textContent = response.about;
      closePopupWindow(popupOpenTypeEdit);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(popupOpenTypeEdit, false);
    });
}

// Открытие попапа при клике на картинку
function openPopupImage(cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupImage.textContent = cardImage.alt;
  openPopupWindow(popupOpenTypeImage);
}

// Открытие попапа редактирования профиля
function openPopupEdit(popupOpenTypeEdit) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopupWindow(popupOpenTypeEdit);
}

//Добавление текста «Сохранение...», пока данные загружаются
function renderLoading(element, isLoading) {
  const safeButton = element.querySelector(".safe");
  const loadingButton = element.querySelector(".loading");
  if (isLoading) {
    safeButton.classList.add("safe__hidden");
    loadingButton.classList.add("loading__visible");
  } else {
    safeButton.classList.remove("safe__hidden");
    loadingButton.classList.remove("loading__visible");
  }
}

//Получаем информацию о пользователе и выводим карточки
Promise.all([getUser(), getCards()])
  .then(([user, data]) => {
    const name = user.name;
    const about = user.about;
    profileTitle.textContent = name;
    profileDescription.textContent = about;
    document.querySelector(
      ".profile__image"
    ).style.backgroundImage = `url(${user.avatar})`;
    Array.from(data).forEach((item) => {
      const dataCard = {
        name: item.name,
        link: item.link,
        likes: item.likes,
        owner: item.owner._id,
        cardid: item._id,
      };
      const cardObject = createCard(dataCard, openPopupImage, user._id);
      placesList.append(cardObject);
    });
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

buttonOpenPopupProfile.addEventListener("click", () => {
  clearValidation(formAddTypeEdit, validationConfig);
  openPopupEdit(popupOpenTypeEdit);
});

buttonAddProfile.addEventListener("click", () => {
  clearValidation(formAddImage, validationConfig);
  openPopupWindow(popupOpenTypeNewCard);
});

buttonEditAvatar.addEventListener("click", () => {
  clearValidation(formAddAvatar, validationConfig);
  openPopupWindow(popupEditAvatar);
});

formAddTypeEdit.addEventListener("submit", handleFormEditSubmit);
formAddImage.addEventListener("submit", createNewCard);
formAddAvatar.addEventListener("submit", replaceAvatar);

enableValidation(validationConfig);
