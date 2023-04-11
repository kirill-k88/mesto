export default class Popup {
  constructor({ popupSelector, closeButtonSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButtonElement =
      this._popupElement.querySelector(closeButtonSelector);
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
      this.close();
    }
  };

  setEventListeners = () => {
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
    this._closeButtonElement.addEventListener('click', this.close);
  };
}
