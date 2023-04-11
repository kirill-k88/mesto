import Popup from './Popup.js';
import { popupImageSelectorCollection } from '../utils/constants.js';

export class PopupWithImage extends Popup {
  constructor() {
    /*  { link, name }, */
    super(popupImageSelectorCollection);
    /*  this._link = link;
    this._name = name; */
    console.log(this);
    this._figureImg = this._popupElement.querySelector(
      popupImageSelectorCollection.figureImgSelector
    );
    this._figureCaption = this._popupElement.querySelector(
      popupImageSelectorCollection.figureCaptionSelector
    );
  }

  open = ({ link, name }) => {
    this._figureImg.src = link;
    this._figureImg.alt = name;
    this._figureCaption.textContent = name;
    super.open();
  };
}
