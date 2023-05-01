import Popup from './Popup.js';

export class ConfirmPopup extends Popup {
  constructor(
    {
      popupSelector,
      popupFormSelector,
      popupIsOpenedClass,
      closeButtonSelector,
      popupButtonSubmitSelector,
    },
    handleFormSubmit
  ) {
    super(popupSelector, popupIsOpenedClass, closeButtonSelector);

    //получить форму
    this._popupFormElement =
      this._popupElement.querySelector(popupFormSelector);

    //функция обработки сабмита формы
    this._handleFormSubmit = handleFormSubmit;

    //получить элементк кнопки сабмита
    this._buttonSubmitElement = this._popupFormElement.querySelector(
      popupButtonSubmitSelector
    );

    //Для унификации попапов сохраняем текст кнопки сабмита
    this._buttonSubmitText = this._buttonSubmitElement.textContent;
  }

  open = (cardId, cardElement) => {
    this._cardId = cardId;
    this._cardElement = cardElement;
    super.open();
  };

  //Ф-я переключения текста кнопки при загрузке данных
  toggleSubmitButtonText = () => {
    if (this._buttonSubmitText != this._buttonSubmitElement.textContent) {
      this._buttonSubmitElement.textContent = this._buttonSubmitText;
    } else {
      this._buttonSubmitElement.textContent = 'Сохранение...';
    }
  };

  getCardElement = () => this._cardElement;

  //Переопределенная ф-я установки листнеров
  setEventListeners = () => {
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId);
    });
    super.setEventListeners();
  };
}
