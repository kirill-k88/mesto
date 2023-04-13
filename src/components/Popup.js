export default class Popup {
  constructor(popupSelector, popupIsOpenedClass, closeButtonSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButtonElement =
      this._popupElement.querySelector(closeButtonSelector);

    this._popupIsOpenedClass = popupIsOpenedClass;
  }

  //ф-я открытия попапа
  open() {
    this._popupElement.classList.add(this._popupIsOpenedClass);
    window.addEventListener('keydown', this._handleEscClose);
  }

  //ф-я закрытия попапа
  _close() {
    this._popupElement.classList.remove(this._popupIsOpenedClass);
    window.removeEventListener('keydown', this._handleEscClose);
  }

  //ф-я обработки нажатия клавиши ESC
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this._close();
    }
  };

  //Ф-я установки листнеров
  setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target === this._popupElement) {
        this._close();
      }
    });
    this._closeButtonElement.addEventListener('click', () => {
      this._close();
    });
  }
}
