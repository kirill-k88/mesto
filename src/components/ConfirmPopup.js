import Popup from './Popup.js';

export class ConfirmPopup extends Popup {
  constructor(
    { popupSelector, popupFormName, popupIsOpenedClass, closeButtonSelector },
    handleFormSubmit
  ) {
    super(popupSelector, popupIsOpenedClass, closeButtonSelector);

    //получить форму
    this._popupFormElement = document.forms[popupFormName];

    //функция обработки сабмита формы
    this._handleFormSubmit = handleFormSubmit.bind(this);
  }

  open = (cardId, cardElement) => {
    this._cardId = cardId;
    this._cardElement = cardElement;
    super.open();
  };

  //Переопределенная ф-я установки листнеров
  setEventListeners() {
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId, this._cardElement);
      this.close();
    });
    super.setEventListeners();
  }
}
