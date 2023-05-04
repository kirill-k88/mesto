export class Card {
  constructor(
    cardObj,
    handleCardClick,
    isOwner,
    handleClickRemoveButton,
    hasLike,
    like,
    dislike,

    {
      template,
      elementSelector,
      pictureSelector,
      titleSelector,
      buttonRemoveSelector,
      buttonRemoveVisibilityClass,
      buttonLikeSelector,
      buttonLikeActiveClass,
      likeCountSelector,
    }
  ) {
    //селекторы карточки
    this._template = template;
    this._elementSelector = elementSelector;
    this._pictureSelector = pictureSelector;
    this._titleSelector = titleSelector;
    this._buttonRemoveSelector = buttonRemoveSelector;
    this._buttonRemoveVisibilityClass = buttonRemoveVisibilityClass;
    this._buttonLikeSelector = buttonLikeSelector;
    this._likeCountSelector = likeCountSelector;
    //классы для интерактивности карточки
    this._buttonLikeActiveClass = buttonLikeActiveClass;
    //объект со свойствами карточки
    this._cardObj = cardObj;
    //ф-я открытия окна карточки
    this._handleCardClick = handleCardClick;
    //Ф-я открытия попапа подтверждения удаления карточки
    this._handleClickRemoveButton = handleClickRemoveButton;
    //Ф-я проверки является ли текущий пльзователь владельцем карточки
    this._isOwner = isOwner;
    //Ф-я проверки лайка от текущего пользователя
    this._hasLike = hasLike;

    /* this._openConfirmPopup = openConfirmPopup; */
    //ф-я установки записи лайка на сервер
    this._like = like.bind(this);
    //ф-я удаления лайка с сервера
    this._disLike = dislike.bind(this);
    //Получить содержимое шаблона карточки
    this._cardTemplate = document.querySelector(this._template);
  }

  //Ф-я снятия установки лайка
  _toggleLike = () => {
    const self = this;
    if (!this._hasLike(this._likeList)) {
      this._like(this.getCardId(), self);
    } else {
      this._disLike(this.getCardId(), self);
    }
  };

  //Отобразить количество лайков
  _setLikesNumber() {
    this._likeCountElement.textContent = this._likeList.length;
  }

  //Ф-я отображения лкйка
  updateLikes = (cardObj) => {
    //поулчить массив лайков
    this._likeList = cardObj.likes;
    //отображить лайк
    if (this._hasLike(this._likeList)) {
      this._cardButtonLikeElement.classList.add(this._buttonLikeActiveClass);
    } else {
      this._cardButtonLikeElement.classList.remove(this._buttonLikeActiveClass);
    }
    //Отобразить количество лайков
    this._setLikesNumber();
  };

  //Ф-я установки листнеров карточки
  _setListeners() {
    //Добавить обработчик событий на кнопку удаления
    this._cardButtonRemoveElement.addEventListener('click', () => {
      this._handleClickRemoveButton(this);
    });
    //Добавить обработчик событий на кнопку лайка
    this._cardButtonLikeElement.addEventListener('click', this._toggleLike);
    //Добавить обработчик событий на изображение
    this._cardPicture.addEventListener('click', () => {
      this._handleCardClick(this._cardObj);
    });
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

  //получить id карточки
  getCardId = () => this._cardObj._id;

  //Cкрыть кнопку удаления чужой карточки
  _toggleButtonDeleteVisibility() {
    if (!this._isOwner(this._cardObj)) {
      this._cardButtonRemoveElement.classList.add(
        this._buttonRemoveVisibilityClass
      );
    }
  }

  //ф-я удаления карточки
  removeCard() {
    this._cardElement.remove();
  }

  getCard() {
    //получить карточку
    this._cardElement = this._getCardElement();

    //Наполнить элемент изображения
    this._cardPicture = this._cardElement.querySelector(this._pictureSelector);

    //Получить элемент кнопки удаления
    this._cardButtonRemoveElement = this._cardElement.querySelector(
      this._buttonRemoveSelector
    );

    //Получить элемент кнопки лайка
    this._cardButtonLikeElement = this._cardElement.querySelector(
      this._buttonLikeSelector
    );

    //Получить элемент счетчика лайков
    this._likeCountElement = this._cardElement.querySelector(
      this._likeCountSelector
    );

    this._cardPicture.src = this._cardObj.link;
    this._cardPicture.alt = this._cardObj.name;
    this._cardElement.querySelector(this._titleSelector).textContent =
      this._cardObj.name;
    //установить слушателей событий карточки
    this._setListeners();
    //Установить видимость  кнопки удаления карточки
    this._toggleButtonDeleteVisibility();

    //установить лайки
    this.updateLikes(this._cardObj);

    return this._cardElement;
  }
}
