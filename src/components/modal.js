// Работу модальных окон

// Открытие попапа при клике на картинку
export function popupImage(cardImage) {
  const popupTypeImage = document.querySelector(".popup_type_image");
  popupTypeImage.querySelector(".popup__image").src = cardImage.src;
  popupTypeImage.querySelector(".popup__caption").textContent = cardImage.alt;
  openPopupWindow(popupTypeImage);
}

// Открытие попапа
export function openPopupWindow(popup) {
  popup.classList.add("popup_is-opened");
}

// Закрытие попапа
export function closePopupWindow(popup) {
  popup.classList.remove("popup_is-opened");
}

// Открытие попапа релкитрования профиля
export function openPopupEdit(popup) {
  popup.classList.add("popup_is-opened");
  const popupTypeEdit = document.querySelector(".popup_type_edit");
  const nameInput = popupTypeEdit.querySelector(".popup__input_type_name");
  const jobInput = popupTypeEdit.querySelector(
    ".popup__input_type_description"
  );
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Закрытие попапа редактирования профиля
export function closePopupEdit(popup) {
  const editProfileForm = popup.querySelector(".popup__form");
  popup.classList.remove("popup_is-opened");
  editProfileForm.reset();
}
