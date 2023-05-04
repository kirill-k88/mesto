import Popup from './Popup.js';

export class ConfirmPopup extends Popup {
  constructor({
    popupSelector,
    popupFormSelector,
    popupIsOpenedClass,
    closeButtonSelector,
    popupButtonSubmitSelector,
  }) {
    super(popupSelector, popupIsOpenedClass, closeButtonSelector);

    //получить форму
    this._popupFormElement =
      this._popupElement.querySelector(popupFormSelector);

    //получить элементк кнопки сабмита
    this._buttonSubmitElement = this._popupFormElement.querySelector(
      popupButtonSubmitSelector
    );

    //Для унификации попапов сохраняем текст кнопки сабмита
    this._buttonSubmitText = this._buttonSubmitElement.textContent;
  }

  //Ф-я переключения текста кнопки при загрузке данных
  toggleSubmitButtonText() {
    if (this._buttonSubmitText != this._buttonSubmitElement.textContent) {
      this._buttonSubmitElement.textContent = this._buttonSubmitText;
    } else {
      this._buttonSubmitElement.textContent = 'Сохранение...';
    }
  }

  setSubmitAction(handleSubmit, card) {
    //именованая функция, чтобы можно было удалить листнер
    this._handleSubmit = function (evt) {
      evt.preventDefault();
      handleSubmit(card);
    };

    this._popupElement.addEventListener('submit', this._handleSubmit);
  }

  close() {
    //удалить листнер, завязаный на конкретный card
    this._popupElement.removeEventListener('submit', this._handleSubmit);

    super.close();
  }
}
