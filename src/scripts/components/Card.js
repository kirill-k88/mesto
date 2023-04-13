export class Card {
  constructor(
    cardObj,
    handleCardClick,
    {
      template,
      elementSelector,
      pictureSelector,
      titleSelector,
      buttonRemoveSelector,
      buttonLikeSelector,
      buttonLikeActiveClass,
    }
  ) {
    //селекторы карточки
    this._template = template;
    this._elementSelector = elementSelector;
    this._pictureSelector = pictureSelector;
    this._titleSelector = titleSelector;
    this._buttonRemoveSelector = buttonRemoveSelector;
    this._buttonLikeSelector = buttonLikeSelector;
    //классы для интерактивности карточки
    this._buttonLikeActiveClass = buttonLikeActiveClass;
    //объект со свойствами карточки
    this._cardObj = cardObj;
    //ф-я открытия окна карточки
    this._handleCardClick = handleCardClick;

    //Получить содержимое шаблона карточки
    this._cardTemplate = document.querySelector(this._template);
  }

  //Ф-я снятия установки лайка
  _toggleLike = (evt) => {
    evt.target.classList.toggle(this._buttonLikeActiveClass);
  };

  //Ф-я удаления карточки
  _removeCard = () => {
    this._cardElement.remove();
  };

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
      this._handleCardClick(this._cardObj);
    });
  }

  _getCardImg() {
    const cardPicture = this._cardElement.querySelector(this._pictureSelector);
    return cardPicture;
  }

  _getCardElement() {
    //Получить содержимое шаблона карточки
    const cardTemplateContent = this._cardTemplate.content;
    //Получить элемент катрочки из шаблона
    const cardElement = cardTemplateContent
      .querySelector(this._elementSelector)
      .cloneNode(true);

    return cardElement;
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
