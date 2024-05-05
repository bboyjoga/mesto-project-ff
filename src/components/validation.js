export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export function showError(
  formElement,
  inputElement,
  validationConfig,
  errorMessage
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
}

export function hideError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

export function checkInputValidity(
  formElement,
  inputElement,
  validationConfig
) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      validationConfig,
      inputElement.validationMessage
    );
  } else {
    hideError(formElement, inputElement, validationConfig);
  }
}

export function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      toggleButtonState(inputList, buttonElement, validationConfig);
      checkInputValidity(formElement, inputElement, validationConfig);
    });
  });
}

export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

export function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

export function clearValidation(formElement, validationConfig) {
  const arrayPopupButton = Array.from(
    formElement.querySelectorAll(validationConfig.submitButtonSelector)
  );
  arrayPopupButton.forEach((item) => {
    item.classList.add(validationConfig.inactiveButtonClass);
  });

  const arraySpanError = Array.from(
    formElement.querySelectorAll(".form__input-error")
  );
  arraySpanError.forEach((item) => {
    item.classList.remove(validationConfig.errorClass);
    item.textContent = "";
  });

  const arrayInputError = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  arrayInputError.forEach((item) => {
    item.classList.remove(validationConfig.inputErrorClass);
  });
}
