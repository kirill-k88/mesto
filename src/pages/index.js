//Подключить css
import './index.css';

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
} from '../utils/constants.js';

//Подключить класс профайла
import { UserInfo } from '../components/UserInfo.js';

//Подключить класс валидации формы
import { FormValidator } from '../components/FormValidator.js';

//Подключить класс секции для добавления карточек
import { Section } from '../components/Section.js';

//Подключить класс карточки
import { Card } from '../components/Card.js';

//Подключить класс попапа картинки
import { PopupWithImage } from '../components/PopupWithImage.js';

//Подключить класс попапа профайла
import { PopupWithForm } from '../components/PopupWithForm.js';

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
function renderCard(cardObj) {
  const newCard = new Card(
    cardObj,
    (cardData) => {
      popupImage.open(cardData);
    },
    cardSelectorCollection
  );
  const cardElement = newCard.getCard();
  cardList.addItem(cardElement);
}

//Создать экземпляр секции-контейнера для карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardObj) => {
      renderCard(cardObj);
    },
  },
  cardContainerSelector
);

//Добавить на страницу карточки из перечня по-умолчанию
cardList.renderItems();

//Экземпляр класса попапа с формаой для профайла
const popupProfile = new PopupWithForm(
  popupProfileSelectorCollection,
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
function handleProfileFormSubmit(inputValues) {
  //добавить на экран значения
  profileInfo.setUserInfo(inputValues);
}

//Ф-я обработки сабмита формы добавления карточки
function handleAddCardFormSubmit({ cardNameInput, cardUrlInput }) {
  const cardObj = {
    name: cardNameInput,
    link: cardUrlInput,
  };
  //Добавить новую карточку в список
  renderCard(cardObj);
}

//включить валидацию формы добавления карточки
popupAddCardFormValidator.enableValidation();

//включить валидацию формы
popupProfileFormValidator.enableValidation();

//Добавить событие нажатия кнопки редактировать
buttonEditElement.addEventListener('click', () => {
  popupProfile.setInputValues(profileInfo.getUserInfo());
  checkValidationProfileFormBeforOpen();
  popupProfile.open();
});

//Добавить событие нажатия кнопки добавить карточку
buttonAddCardElement.addEventListener('click', () => {
  checkValidationAddCardFormBeforOpen();
  popupAddCard.open();
});
