import Popup from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(
    {
      popupSelector,
      popupFormName,
      popupInputHeadingName,
      popupInputOptionName,
      popupButtonSubmitSelector,
      inputSelector,
      popupIsOpenedClass,
      closeButtonSelector,
    },
    handleFormSubmit
  ) {
    super(popupSelector, popupIsOpenedClass, closeButtonSelector);

    //получить форму
    this._popupFormElement = document.forms[popupFormName];

    //получить элементы формы
    this._popupInputHeadingElement =
      this._popupFormElement.elements[popupInputHeadingName];
    this._popupInputOptionElement =
      this._popupFormElement.elements[popupInputOptionName];

    //получить все инпуты
    this._inputList = this._popupFormElement.querySelectorAll(inputSelector);

    //функция обработки сабмита формы
    this._handleFormSubmit = handleFormSubmit;
  }

  //Наполнить контентом элементы формы
  setInputValues = (inputValues) => {
    this._inputList.forEach((input) => {
      input.value = inputValues[input.name];
    });
  };

  //Получить тексты полей в объект
  _getInputValues = () => {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  };

  //переопределенная функция закрытия
  close = () => {
    //сброс полей формы
    this._popupFormElement.reset();
    super.close();
  };

  //Переопределенная ф-я установки листнеров
  setEventListeners() {
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}
