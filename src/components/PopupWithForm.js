import Popup from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(
    {
      popupSelector,
      popupInputHeadingName,
      popupInputOptionName,
      popupButtonSubmitSelector,
    },
    popupFormElement,
    popupIsOpenedClass,
    closeButtonSelector,
    handleFormSubmit
  ) {
    super(popupSelector, popupIsOpenedClass, closeButtonSelector);

    this._popupFormElement = popupFormElement;

    //получить элементы формы
    this._popupInputHeadingElement =
      this._popupFormElement.elements[popupInputHeadingName];
    this._popupInputOptionElement =
      this._popupFormElement.elements[popupInputOptionName];
    this._popupButtonSubmitElement = this._popupFormElement.querySelector(
      popupButtonSubmitSelector
    );
    //функция обработки сабмита формы
    this._handleFormSubmit = handleFormSubmit;
  }

  //Наполнить контентом элементы формы
  setInputValues = ({ inputHeading, inputOption }) => {
    this._popupInputHeadingElement.value = inputHeading;
    this._popupInputOptionElement.value = inputOption;
  };

  //Получить тексты полей в объект
  getInputValues = () => {
    return {
      inputHeading: this._popupInputHeadingElement.value,
      inputOption: this._popupInputOptionElement.value,
    };
  };

  //сброс полей формы
  reset = () => {
    this._popupFormElement.reset();
  };

  //Переопределенная ф-я открытия попапа
  open(checkValidationFormBeforOpen) {
    checkValidationFormBeforOpen();
    super.open();
  }

  //Переопределенная ф-я установки листнеров
  setEventListeners() {
    this._popupElement.addEventListener('submit', (evt) => {
      this._handleFormSubmit(evt);
      this._close();
    });
    super.setEventListeners();
  }
}
