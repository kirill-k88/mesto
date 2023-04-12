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
  }

  //Ф-я снятия установки лайка
  _toggleLike(evt) {
    evt.target.classList.toggle(this._buttonLikeActiveClass);
  }

  //Ф-я удаления карточки
  _removeCard(evt) {
    evt.target.closest(this._elementSelector).remove();
  }

  //Ф-я установки листнеров карточки
  _setListeners(cardElement, cardPicture) {
    //Добавить обработчик событий на кнопку удаления
    cardElement
      .querySelector(this._buttonRemoveSelector)
      .addEventListener('click', this._removeCard.bind(this));
    //Добавить обработчик событий на кнопку лайка
    cardElement
      .querySelector(this._buttonLikeSelector)
      .addEventListener('click', this._toggleLike.bind(this));
    //Добавить обработчик событий на изображение
    cardPicture.addEventListener('click', () => {
      this._handleCardClick(this._cardObj);
    });
  }

  getCard() {
    //Получить содержимое шаблона карточки
    const cardTemplateContent = document.querySelector(this._template).content;
    //Получить элемент катрочки из шаблона
    const cardElement = cardTemplateContent
      .querySelector(this._elementSelector)
      .cloneNode(true);
    //Наполнить контентом элемент карточки
    const cardPicture = cardElement.querySelector(this._pictureSelector);
    cardPicture.src = this._cardObj.link;
    cardPicture.alt = this._cardObj.name;
    cardElement.querySelector(this._titleSelector).textContent =
      this._cardObj.name;
    //установить слушателей событий карточки
    this._setListeners(cardElement, cardPicture);

    return cardElement;
  }
}
