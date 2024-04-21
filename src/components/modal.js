// Работа модальных окон

// Открытие попапа
export function openPopupWindow(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

// Закрытие попапа
export function closePopupWindow(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

export function closePopupByOverlay(popup) {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopupWindow(evt.currentTarget);
    }
  });
}

export function closePopupByEsc(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopupWindow(openedPopup);
  }
}
