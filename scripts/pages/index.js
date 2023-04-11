//Получить кнопки
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');
//Получить список карточек
/* const cardsContainer = document.querySelector('.cards__list'); */

//Получить список попапов
const popupList = document.querySelectorAll('.popup');

//Кнопки закрытия попапов
const popupCloseButtons = document.querySelectorAll('.popup__button-close');

//Получить элементы попапа добавления
const popupAddCard = document.querySelector('.popup_type_add');
const popupAddCardForm = document.forms['cardAdd-form'];
const popupAddCardHeading = popupAddCardForm.elements.cardNameInput;
const popupAddCardOption = popupAddCardForm.elements.cardUrlInput;
const popupAddCardButtonSubmit = popupAddCardForm.querySelector(
  '.popup__button-submit'
);

//Получить элементы попапа редактирования профиля
const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileForm = document.forms['profile-form'];
const popupProfileHeading = popupProfileForm.elements.profileNameInput;
const popupProfileOption = popupProfileForm.elements.ocupationInput;
const popupProfileButtonSubmit = popupProfileForm.querySelector(
  '.popup__button-submit'
);

//Получить элемент попап изображения
const popupImage = document.querySelector('.popup_type_image');
const popupImageFigureImg = popupImage.querySelector('.popup__image');
const popupImageFigureCaption = popupImage.querySelector('.popup__caption');

//Получить поле имя на странице
const profileName = document.querySelector('.profile__name');
//Получить поле имя на странице
const profileOcupation = document.querySelector('.profile__ocupation');

//Объект конфигурация с набором классов и селекторов шаблона карточки
const cardSelectorCollection = {
  template: '#Card',
  elementSelector: '.cards__card',
  pictureSelector: '.cards__photo',
  titleSelector: '.cards__title',
  buttonRemoveSelector: '.cards__button-remove',
  buttonLikeSelector: '.cards__button-like',
  buttonLikeActiveClass: 'cards__button-like_active',
};

//Подключить класс карточки
import { Card } from '../components/Card.js';

//Набор селекторов и классов для валидации
const formSelectorCollection = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active',
};

//Подключить класс валидации формы
import { FormValidator } from '../components/FormValidator.js';

//Получить обхъект валидации для формы добавления карточки
const popupAddCardFormValidator = new FormValidator(
  formSelectorCollection,
  popupAddCardForm
);

//Получить обхъект валидации для формы profile
const popupProfileFormValidator = new FormValidator(
  formSelectorCollection,
  popupProfileForm
);

//Ф-я открытия попапа изображения и наполнения его данынми
function showImagePopup(cardObj) {
  //Наполнить контентом элемент формы
  popupImageFigureImg.src = cardObj.link;
  popupImageFigureImg.alt = cardObj.name;
  popupImageFigureCaption.textContent = cardObj.name;
  //Показать попап
  showPopup(popupImage);
}

//Подключить класс секции для добавления
import { Section } from '../components/Section.js';
//Подключить набор карточек
import { initialCards } from '../utils/constants.js';

//Создать экземпляр секции-контейнера для карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardObj) => {
      const card = new Card(cardSelectorCollection, cardObj, showImagePopup);
      const cardElement = card.getCard();
      cardList.addItem(cardElement);
    },
  },
  '.cards__list'
);

//Добавить на страницу карточки из перечня по-умолчанию
cardList.renderItems();

//Функция добавления карточки
function addCard(cardSelectorCollection, cardObj, showImagePopup) {
  const card = new Card(cardSelectorCollection, cardObj, showImagePopup);
  //Добавить карточку в список
  cardList.addItem(card.getCard());
}

//Добавить обработчик событий попапа и клавиши Esc
function addListenerClosePopup() {
  //Добавить обработчик на нажатие клавиши Esc
  window.addEventListener('keydown', handlerWindowKeydown);
}

//Ф-я визуализации попапа
function showPopup(popup) {
  popup.classList.add('popup_opened');
  //Добавить листнер попапа
  addListenerClosePopup();
}

//Ф-я скрытия попапа
function hidePopup(popup) {
  popup.classList.remove('popup_opened');
  //удаление листнера нажатия Esc
  window.removeEventListener('keydown', handlerWindowKeydown);
}

//Ф-я открытия попапа редактирования профиля и наполнения его данынми
function showPopupProfile() {
  //Наполнить контентом элементы формы
  popupProfileHeading.value = profileName.textContent;
  popupProfileOption.value = profileOcupation.textContent;
  //проверить валидность формы для отображения кнопки
  popupProfileFormValidator.toggleSubmitButtonVisability();
  //скрыть сообщения о невалидности
  popupProfileFormValidator.hideInputErors();
  //Показать попап
  showPopup(popupProfile);
}

//Ф-я открытия попапа добавления карточки и наполнения его данными
function showPopupAddCard() {
  //Очистить поля ввода формы
  popupAddCardForm.reset();
  //проверить валидность формы для отображения кнопки
  popupAddCardFormValidator.toggleSubmitButtonVisability();
  //скрыть сообщения о невалидности
  popupAddCardFormValidator.hideInputErors();
  //Показать попап
  showPopup(popupAddCard);
}

//Ф-я сохранения значения, глушим стандартный обработчик
function handleProfileFormSubmit(evt) {
  //заглушить стандартное действие submit
  evt.preventDefault();
  //Добавить на экран значения
  profileName.textContent = popupProfileHeading.value;
  //добавить на экран значения
  profileOcupation.textContent = popupProfileOption.value;
  //Закрыть попап
  hidePopup(popupProfile);
}

//Ф-я создания карточки по данным из попапа
function handleAddCardFormSubmit(evt) {
  //заглушить стандартное действие submit
  evt.preventDefault();
  const cardObj = {
    name: popupAddCardHeading.value,
    link: popupAddCardOption.value,
  };
  //Добавить новую карточку в список
  addCard(cardSelectorCollection, cardObj, showImagePopup);
  //Закрыть попап
  hidePopup(popupAddCard);
}

//Ф-я закрытия попапа по кнопке Esc
function handlerWindowKeydown(evt) {
  if (evt.key === 'Escape') {
    //Получить открытй попап, т.к. его нельзя передать в обработчик
    // нужно удалять листнер, по этой причине невозможно использовать анонимную функцию
    const openedPopup = document.querySelector('.popup_opened');
    hidePopup(openedPopup);
  }
}

//Ф-я закрытия попапа по клику по фону
function handlerHidePopupBackgroundClick(evt, popup) {
  if (evt.target === popup) {
    hidePopup(popup);
  }
}

//включить валидацию формы добавления карточки
popupAddCardFormValidator.enableValidation();

//включить валидацию формы
popupProfileFormValidator.enableValidation();

//Добавить событие нажатия редактировать
buttonEdit.addEventListener('click', showPopupProfile);
//Добавить событие нажатия добавить карточку
buttonAddCard.addEventListener('click', showPopupAddCard);

//Нажатие на кнопку закрыть попапа
Array.from(popupCloseButtons).forEach((closeButton) => {
  const popup = closeButton.closest('.popup');
  closeButton.addEventListener('click', () => {
    hidePopup(popup);
  });
});

//Нажатие на фон попапа приводт к закрытию
Array.from(popupList).forEach((popup) => {
  //Добавить обработчик события нажатия на фон для всех поппапов
  popup.addEventListener('click', (evt) => {
    handlerHidePopupBackgroundClick(evt, popup);
  });
});

//Добавить обработчики событий кнопоки сохранить (submit)
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
//Добавить обработчики событий кнопоки создать (submit)
popupAddCardForm.addEventListener('submit', handleAddCardFormSubmit);
