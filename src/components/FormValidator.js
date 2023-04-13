export class FormValidator {
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    },
    formElement
  ) {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;

    this._formElement = formElement;

    this._inputsList = this._formElement.querySelectorAll(this._inputSelector);

    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  //Показать строку с ошибкой
  _showErrorMsg(inputElement) {
    //получить спан для отображения ошибки
    const inputError = this._formElement.querySelector(
      `.${inputElement.name}-error`
    );
    //получить текст ошибку
    inputError.textContent = inputElement.validationMessage;
    //добавить класс для отображения ошибки
    inputError.classList.add(this._errorClass);
    //добавить класс для инпута
    inputElement.classList.add(this._inputErrorClass);
  }

  //Скрыть строку с ошибкой
  _hideErrorMsg(inputElement) {
    //получить спан для отображения ошибки
    const inputError = this._formElement.querySelector(
      `.${inputElement.name}-error`
    );
    inputError.textContent = '';
    //убрать класс для отображения
    inputError.classList.remove(this._errorClass);
    //убрать класс для инпута
    inputElement.classList.remove(this._inputErrorClass);
  }

  //Ф-я блокировки кнопки submit
  _disableSubmitButton() {
    this._submitButton.disabled = true;
    //добавить класс неактивной кнопки
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  //Ф-я разблокировки кнопки submit
  _enableSubmitButton() {
    this._submitButton.disabled = false;
    //добавить класс неактивной кнопки
    this._submitButton.classList.remove(this._inactiveButtonClass);
  }

  //Ф-я проверки валидности формы
  toggleSubmitButtonVisability() {
    if (!this._formElement.checkValidity()) {
      //блокировать кнопку Submit
      this._disableSubmitButton();
    } else {
      //разблокировать кнопку Submit
      this._enableSubmitButton();
    }
  }

  //Ф-я проверки валидности ввода
  _checkValidationInput(inputElement) {
    //если инпут невалиден показать спан
    if (!inputElement.validity.valid) {
      this._showErrorMsg(inputElement);
    } else {
      //скрыть спан
      this._hideErrorMsg(inputElement);
    }
  }

  //Ф-я добавления обработчика событий ввода на все инпуты для их валидации
  _setListener(inputElement) {
    inputElement.addEventListener('input', () => {
      this._checkValidationInput(inputElement);
      this.toggleSubmitButtonVisability();
    });
  }

  //Ф-я перебора всех инпутов и скрытия их ошибок
  hideInputErors() {
    this._inputsList.forEach((inputElement) => {
      this._hideErrorMsg(inputElement);
    });
  }

  enableValidation() {
    //Добавить обработчики событий
    this._inputsList.forEach((inputElement) => {
      this._setListener(inputElement);
    });
  }
}
