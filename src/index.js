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
const editProfileButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const editProfileForm = popupTypeEdit.querySelector(".popup__form");
const addImageForm = popupTypeNewCard.querySelector(".popup__form");
const nameInput = popupTypeEdit.querySelector(".popup__input_type_name");
const jobInput = popupTypeEdit.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const editAvatarButton = document.querySelector(".profile__image");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const addAvatarForm = popupEditAvatar.querySelector(".popup__form");

editProfileButton.addEventListener("click", () => {
  clearValidation(editProfileForm, validationConfig);
  openPopupEdit(popupTypeEdit);
});

addButton.addEventListener("click", () => {
  clearValidation(addImageForm, validationConfig);
  openPopupWindow(popupTypeNewCard);
});

editAvatarButton.addEventListener("click", () => {
  clearValidation(addAvatarForm, validationConfig);
  openPopupWindow(popupEditAvatar);
});

editProfileForm.addEventListener("submit", handleFormEditSubmit);
addImageForm.addEventListener("submit", createNewCard);
addAvatarForm.addEventListener("submit", replaceAvatar);

//Замена аватарки
function replaceAvatar(evt) {
  evt.preventDefault();
  renderLoading(true);
  const avatarUrl = popupEditAvatar.querySelector(".popup__input_type_url");
  patchAvatar({ avatar: avatarUrl.value })
    .then((response) => {
      profileImage.link = response.avatar;
      profileImage.style.backgroundImage = `url(${response.avatar})`;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false);
    });
  closePopupWindow(popupEditAvatar);
}

// Добавление новой карточки
function createNewCard(evt) {
  evt.preventDefault();
  renderLoading(true);
  const cardName = popupTypeNewCard.querySelector(
    ".popup__input_type_card-name"
  );
  const cardUrl = popupTypeNewCard.querySelector(".popup__input_type_url");
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
      closePopupWindow(popupTypeNewCard);
      addImageForm.reset();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false);
    });
}

// Редактирование информации профиля
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  patchProfile({ name: nameInput.value, about: jobInput.value })
    .then((response) => {
      profileTitle.textContent = response.name;
      profileDescription.textContent = response.about;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false);
    });
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

enableValidation(validationConfig);

//Получаем информацию о пользователе и выводим карточки
Promise.all([getUser(), getCards()])
  .then(([user, data]) => {
    const Name = user.name;
    const About = user.about;
    document.querySelector(".profile__title").innerHTML = Name;
    document.querySelector(".profile__description").innerHTML = About;
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
  })
  .finally(() => {
    renderLoading(false);
  });

//Добавление текста «Сохранение...», пока данные загружаются
function renderLoading(isLoading) {
  const safeButtons = Array.from(document.querySelectorAll(".safe"));
  const loadingButtons = Array.from(document.querySelectorAll(".loading"));
  if (isLoading) {
    safeButtons.forEach((item) => {
      item.classList.add("safe__hidden");
    });
    loadingButtons.forEach((item) => {
      item.classList.add("loading__visible");
    });
  } else {
    safeButtons.forEach((item) => {
      item.classList.remove("safe__hidden");
    });
    loadingButtons.forEach((item) => {
      item.classList.remove("loading__visible");
    });
  }
}
