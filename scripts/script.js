//Получить кнопки
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');
//Получить список карточек
const cardsContainer = document.querySelector('.cards__list');

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

//Получить содержимое шаблона карточки
const cardTemplate = document.querySelector('#Card').content;

//Добавить карточки из перечня по-умолчанию
initialCards.forEach((cardObj) => {
  addCard(cardObj);
});

//Подключить набор карточек
import { initialCards } from './cards.js';

//Функция добавления карточки
function addCard(cardObj) {
  const card = makeCardFromTemplate(cardObj);
  //Добавить карточку в список
  cardsContainer.prepend(card);
}

//Ф-я получения карточки из шаблона
function makeCardFromTemplate(cardObj) {
  //Получить элемент катрочки из шаблона
  const cardElement = cardTemplate
    .querySelector('.cards__card')
    .cloneNode(true);
  //Наполнить контентом элемент карточки
  const cardPhoto = cardElement.querySelector('.cards__photo');
  cardPhoto.src = cardObj.link;
  cardPhoto.alt = cardObj.name;
  cardElement.querySelector('.cards__title').textContent = cardObj.name;
  //Добавить обработчик событий на кнопку удаления
  cardElement
    .querySelector('.cards__button-remove')
    .addEventListener('click', removeCard);
  //Добавить обработчик событий на кнопку лайка
  cardElement
    .querySelector('.cards__button-like')
    .addEventListener('click', toggleLike);
  //Добавить обработчик событий на изображение
  cardPhoto.addEventListener('click', () => {
    showImagePopup(cardObj);
  });
  return cardElement;
}

//Подключить валидацию форм
import {
  selectorsCollectionObj,
  hideInputErors,
  checkValidationForm,
} from './validate.js';

//Ф-я открытия попапа редактирования профиля и наполнения его данынми
function showPopupProfile() {
  //Наполнить контентом элементы формы
  popupProfileHeading.value = profileName.textContent;
  popupProfileOption.value = profileOcupation.textContent;
  //проверить валидность формы
  checkValidationForm(
    popupProfileForm,
    popupProfileButtonSubmit,
    selectorsCollectionObj
  );
  //скрыть сообщения о невалидности
  hideInputErors(popupProfileForm, selectorsCollectionObj);
  //Показать попап
  showPopup(popupProfile);
}

//Ф-я открытия попапа изображения и наполнения его данынми
function showImagePopup(cardObj) {
  //Наполнить контентом элемент формы
  popupImageFigureImg.src = cardObj.link;
  popupImageFigureImg.alt = cardObj.name;
  popupImageFigureCaption.textContent = cardObj.name;
  //Показать попап
  showPopup(popupImage);
}

//Ф-я открытия попапа добавления карточки и наполнения его данными
function showPopupAddCard() {
  //Очистить поля ввода формы
  popupAddCardForm.reset();
  //проверить валидность формы
  checkValidationForm(
    popupAddCardForm,
    popupAddCardButtonSubmit,
    selectorsCollectionObj
  );
  //скрыть сообщения о невалидности
  hideInputErors(popupAddCardForm, selectorsCollectionObj);

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
  addCard(cardObj);
  //Закрыть попап
  hidePopup(popupAddCard);
}

//Ф-я удаления карточки
function removeCard(evt) {
  evt.target.closest('.cards__card').remove();
}

//Ф-я снятия установки лайка
function toggleLike(evt) {
  evt.target.classList.toggle('cards__button-like_active');
}

//Ф-я визуализации попапа
function showPopup(popup) {
  popup.classList.add('popup_opened');
  //Добавить листнер попапа
  addListenerClosePopup(popup);
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

//Ф-я скрытия попапа
function hidePopup(popup) {
  popup.classList.remove('popup_opened');
  //удаление листнера нажатия Esc
  window.removeEventListener('keydown', handlerWindowKeydown);
}

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

//Добавить обработчик событий попапа и клавиши Esc
function addListenerClosePopup(popup) {
  //Добавить обработчик на нажатие клавиши Esc
  window.addEventListener('keydown', handlerWindowKeydown);
}
