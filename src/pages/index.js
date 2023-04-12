//Подключить константы
import {
  initialCards,
  popupImageSelectorCollection,
  cardSelectorCollection,
  popupProfileSelectorCollection,
  popupAddCardSelectorCollection,
  profileSelectorCollection,
  popupIsOpenedClass,
  closeButtonSelector,
  formSelectorCollection,
  buttonEditSelector,
  buttonAddCardSelector,
  cardContainerSelector,
} from '../scripts/utils/constants.js';

//Подключить класс профайла
import { UserInfo } from '../scripts/components/UserInfo.js';

//Подключить класс валидации формы
import { FormValidator } from '../scripts/components/FormValidator.js';

//Подключить класс секции для добавления карточек
import { Section } from '../scripts/components/Section.js';

//Подключить класс карточки
import { Card } from '../scripts/components/Card.js';

//Подключить класс попапа картинки
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';

//Подключить класс попапа профайла
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';

//Получить элементы кнопок
const buttonEditElement = document.querySelector(buttonEditSelector);
const buttonAddCardElement = document.querySelector(buttonAddCardSelector);

//Получить форму попапа добавления карточки
const popupAddCardFormElement =
  document.forms[popupAddCardSelectorCollection.popupFormName];

//Получить форму попапа редактирования профиля
const popupProfileFormElement =
  document.forms[popupProfileSelectorCollection.popupFormName];

//Получить экземпляр класса профайла
const profileInfo = new UserInfo(profileSelectorCollection);

//Получить экземпляр валидации для формы добавления карточки
const popupAddCardFormValidator = new FormValidator(
  formSelectorCollection,
  popupAddCardFormElement
);

//Получить экземпляр валидации для формы profile
const popupProfileFormValidator = new FormValidator(
  formSelectorCollection,
  popupProfileFormElement
);

//Получить экзепляр класса попапа картинки
const popupImage = new PopupWithImage(
  popupImageSelectorCollection,
  popupIsOpenedClass,
  closeButtonSelector
);

//Добавить слушателей попапа картинки
popupImage.setEventListeners();

//Ф-я создания экземпляра карточки
function createNewCardObject(cardObj) {
  const newCard = new Card(
    cardObj,
    () => {
      popupImage.open(newCard._cardObj);
    },
    cardSelectorCollection
  );
  return newCard;
}

//Создать экземпляр секции-контейнера для карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardObj) => {
      const card = createNewCardObject(cardObj);
      const cardElement = card.getCard();
      cardList.addItem(cardElement);
    },
  },
  cardContainerSelector
);

//Добавить на страницу карточки из перечня по-умолчанию
cardList.renderItems();

//Функция добавления карточки
function addCard(cardObj) {
  const card = createNewCardObject(cardObj);
  //Добавить карточку в список
  cardList.addItem(card.getCard());
}

//Экземпляр класса попапа с формаой для профайла
const popupProfile = new PopupWithForm(
  popupProfileSelectorCollection,
  popupProfileFormElement,
  popupIsOpenedClass,
  closeButtonSelector,
  handleProfileFormSubmit
);

//Устанавить слушателей попапа профайла
popupProfile.setEventListeners();

//Ф-я проверки валидации формы профайла при ее открытии
function checkValidationProfileFormBeforOpen() {
  //проверить валидность формы для отображения кнопки
  popupProfileFormValidator.toggleSubmitButtonVisability();
  //скрыть сообщения о невалидности
  popupProfileFormValidator.hideInputErors();
}

//Экземпляр класса попапа с формаой для добавления карточек
const popupAddCard = new PopupWithForm(
  popupAddCardSelectorCollection,
  popupAddCardFormElement,
  popupIsOpenedClass,
  closeButtonSelector,
  handleAddCardFormSubmit
);

//Устанавить слушателей попапа добавления карточек
popupAddCard.setEventListeners();

//Ф-я проверки валидации формы добавления карточки при ее открытии
function checkValidationAddCardFormBeforOpen() {
  //проверить валидность формы для отображения кнопки
  popupAddCardFormValidator.toggleSubmitButtonVisability();
  //скрыть сообщения о невалидности
  popupAddCardFormValidator.hideInputErors();
}

//Ф-я обработки сабмита формы профайла
function handleProfileFormSubmit(evt) {
  //заглушить стандартное действие submit
  evt.preventDefault();
  //добавить на экран значения
  profileInfo.setUserInfo(this._getInputValues());
}

//Ф-я обработки сабмита формы добавления карточки
function handleAddCardFormSubmit(evt) {
  //заглушить стандартное действие submit
  evt.preventDefault();

  const cardObj = {
    name: this.getInputValues().inputHeading,
    link: this.getInputValues().inputOption,
  };
  //Добавить новую карточку в список
  addCard(cardObj);
}

//включить валидацию формы добавления карточки
popupAddCardFormValidator.enableValidation();

//включить валидацию формы
popupProfileFormValidator.enableValidation();

//Добавить событие нажатия кнопки редактировать
buttonEditElement.addEventListener('click', () => {
  popupProfile.setInputValues(profileInfo.getUserInfo());
  popupProfile.open(checkValidationProfileFormBeforOpen);
});

//Добавить событие нажатия кнопки добавить карточку
buttonAddCardElement.addEventListener('click', () => {
  popupAddCard.reset();
  popupAddCard.open(checkValidationAddCardFormBeforOpen);
});
