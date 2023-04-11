export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open = () => {
    this._popupElement.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose);
  };

  close = () => {
    this._popupElement.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      //Получить открытй попап, т.к. его нельзя передать в обработчик
      // нужно удалять листнер, по этой причине невозможно использовать анонимную функцию
      /* const openedPopup = document.querySelector('.popup_opened');
      hidePopup(openedPopup); */
      this.close();
    }
  };

  setEventListeners = () => {};
}
