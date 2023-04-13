import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(
    { popupSelector, figureImgSelector, figureCaptionSelector },
    popupIsOpenedClass,
    closeButtonSelector
  ) {
    super(popupSelector, popupIsOpenedClass, closeButtonSelector);
    this._figureImgElement =
      this._popupElement.querySelector(figureImgSelector);
    this._figureCaptionElement = this._popupElement.querySelector(
      figureCaptionSelector
    );
  }

  //переопределенная ф-я открытия попапа
  open = ({ link, name }) => {
    this._figureImgElement.src = link;
    this._figureImgElement.alt = name;
    this._figureCaptionElement.textContent = name;
    super.open();
  };
}
