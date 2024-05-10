// Работа модальных окон

// Открытие попапа
export function openPopupWindow(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
  document.addEventListener("click", closePopupByOverlay);
}

// Закрытие попапа
export function closePopupWindow(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
  document.removeEventListener("click", closePopupByOverlay);
}

export function closePopupByOverlay(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopupWindow(openedPopup);
  }
}

export function closePopupByEsc(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopupWindow(openedPopup);
  }
}
