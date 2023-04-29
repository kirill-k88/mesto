//Подключить css
import './index.css';

//Подключить константы
import {
  popupImageSelectorCollection,
  cardSelectorCollection,
  popupProfileSelectorCollection,
  popupAddCardSelectorCollection,
  popupConfirmSelectorCollection,
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

//Подключить класс попапа профайла
import { ConfirmPopup } from '../components/ConfirmPopup.js';

//Подключить класс Api
import { Api } from '../components/Api.js';

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

//Экземпляр класса попапа confirm
const popupConfirm = new ConfirmPopup(
  popupConfirmSelectorCollection,
  handleConfirmFormSubmit
);

//Устанавить слушателей попапа confirm
popupConfirm.setEventListeners();

//Создать экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '5dc10575-faf8-4cb0-bf95-93ad59b5cd72',
    'Content-Type': 'application/json',
  },
});

//Создать экземпляр секции-контейнера для карточек
const cardList = new Section(renderCard, cardContainerSelector);

//Ф-я создания экземпляра карточки
function renderCard(cardObj) {
  const newCard = new Card(
    cardObj,
    //Ф-я открытия попапа
    (cardData) => {
      popupImage.open(cardData);
    },
    //Проверка является ли текущий пользователем владельцем карточки
    ({ owner }) => {
      return profileInfo.getUserId() === owner._id;
    },
    //открытие попапа подтверждения удаления карточки
    (id, cardElement) => {
      popupConfirm.open(id, cardElement);
    },
    //Проверка наличия лайка от текущего пользователя
    ({ likes }) => {
      likes.forEach((owner) => {
        if (owner._id === profileInfo.getUserId()) {
          return true;
        }
      });
      return false;
    },
    cardSelectorCollection
  );
  const cardElement = newCard.getCard();
  cardList.addItem(cardElement);
}

//Получить пользователя и отобразить его данные
//Поуличить карточки и отрисовать после получения пользователя
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((values) => {
    profileInfo.setUser(values[0]);
    return Promise.resolve(values[1]);
  })
  .then((initialCards) => {
    //Добавить на страницу карточки из перечня по-умолчанию
    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

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
  //изменить текст кнопки на загрузка...
  this.toggleSubmitButtonText();
  const userInfoObject = {
    name: inputValues.profileNameInput,
    about: inputValues.ocupationInput,
  };
  //Записать значения в сервер
  api
    .sendUserInfo(userInfoObject)
    .then((response) => {
      //добавить на экран значения
      profileInfo.setUserInfo(response);
      //изменить текст кнопки обратно
      this.toggleSubmitButtonText();
      this.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Ф-я обработки сабмита формы добавления карточки
function handleAddCardFormSubmit({ cardNameInput, cardUrlInput }) {
  //изменить текст кнопки на загрузка...
  this.toggleSubmitButtonText();
  const cardObj = {
    name: cardNameInput,
    link: cardUrlInput,
  };
  //Добавить новую карточку на сервер
  api
    .sendNewCard(cardObj)
    .then((response) => {
      //Добавить новую карточку в список
      renderCard(response);
      //изменить текст кнопки обратно
      this.toggleSubmitButtonText();
      this.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Ф-я обработки сабмита формы confirm
function handleConfirmFormSubmit(id, cardElement) {
  //Ф-я удаления карточки со страницы и сервера
  api
    .deleteCard(id)
    .then(({ message }) => {
      if (message === 'Пост удалён') {
        cardElement.remove();
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
