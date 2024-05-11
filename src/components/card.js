//Функции для работы с карточками
// Создание карточки
import { deleteMyCard, putLikeCard, deleteLikeCard } from "./api";

export function createCard(card, openPopupImage, currentUserId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const like = cardElement.querySelector(".card__like-button");
  const likeTimes = cardElement.querySelector(".card__like-times");
  cardImage.alt = card.name;
  cardImage.src = card.link;
  likeTimes.textContent = card.likes.length;
  const isLiked = card.likes.some((item) => {
    return item._id === currentUserId;
  });
  if (isLiked) {
    like.classList.add("card__like-button_is-active");
  }
  cardElement.querySelector(".card__title").textContent = card.name;
  deleteCardButton.addEventListener("click", () => {
    deleteMyCard(card.cardid).then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  });
  cardImage.addEventListener("click", () => openPopupImage(cardImage));
  // Постановка и снятие лайка
  like.addEventListener("click", () => {
    const isActive = like.classList.contains("card__like-button_is-active");
    if (isActive) {
      deleteLikeCard(card.cardid).then((response) => {
        likeTimes.textContent = response.likes.length;
        like.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    } else {
      putLikeCard(card.cardid).then((response) => {
        likeTimes.textContent = response.likes.length;
        like.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }
  });
  if (card.owner !== currentUserId) {
    deleteCardButton.remove();
  }
  return cardElement;
}
