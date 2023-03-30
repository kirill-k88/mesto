export class Card {
  constructor(cardSelectorCollection, cardObj, showCardPopup) {
    this._me = this;
    //селекторы карточки
    this._template = cardSelectorCollection.template;
    this._elementSelector = cardSelectorCollection.elementSelector;
    this._pictureSelector = cardSelectorCollection.pictureSelector;
    this._titleSelector = cardSelectorCollection.titleSelector;
    this._buttonRemoveSelector = cardSelectorCollection.buttonRemoveSelector;
    this._buttonLikeSelector = cardSelectorCollection.buttonLikeSelector;
    //классы для интерактивности карточки
    this._buttonLikeActiveClass = cardSelectorCollection.buttonLikeActiveClass;
    //объект со свойствами карточки
    this._cardObj = cardObj;
    //ф-я открытия окна карточки
    this._showCardPopup = showCardPopup;
    //Привязка контекста
    this._removeCard = this._removeCard.bind(this);
    this._toggleLike = this._toggleLike.bind(this);
  }

  //Ф-я снятия установки лайка
  _toggleLike(evt) {
    evt.target.classList.toggle(this._buttonLikeActiveClass);
  }

  //Ф-я удаления карточки
  _removeCard() {
    this._cardElement.remove();
  }

  //Ф-я установки листнеров карточки
  _setListeners() {
    //Добавить обработчик событий на кнопку удаления
    this._cardElement
      .querySelector(this._buttonRemoveSelector)
      .addEventListener('click', this._removeCard);
    //Добавить обработчик событий на кнопку лайка
    this._cardElement
      .querySelector(this._buttonLikeSelector)
      .addEventListener('click', this._toggleLike);
    //Добавить обработчик событий на изображение
    this._cardPicture.addEventListener('click', () => {
      this._showCardPopup(this._cardObj);
    });
  }

  _getCardElement() {
    //Получить содержимое шаблона карточки
    const cardTemplateContent = document.querySelector(this._template).content;
    //Получить элемент катрочки из шаблона
    const cardElement = cardTemplateContent
      .querySelector(this._elementSelector)
      .cloneNode(true);

    return cardElement;
  }

  _getCardImg() {
    const cardPicture = this._cardElement.querySelector(this._pictureSelector);
    return cardPicture;
  }

  getCard() {
    //получить карточку
    this._cardElement = this._getCardElement();
    //Наполнить контентом элемент карточки
    this._cardPicture = this._getCardImg();

    this._cardPicture.src = this._cardObj.link;
    this._cardPicture.alt = this._cardObj.name;
    this._cardElement.querySelector(this._titleSelector).textContent =
      this._cardObj.name;
    //установить слушателей событий карточки
    this._setListeners();

    return this._cardElement;
  }
}
