//Карточки по-умолчанию
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

//Получить кнопки
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');
//Получить список карточек
const cardsList = document.querySelector('.cards__list');

//Получить элементы попапа добавления
const popupAddCard = document.querySelector('.popup_type_add');
const popupAddCardForm = document.forms['cardAdd-form'];
const popupAddCardHeading = popupAddCardForm.elements.cardNameInput;
const popupAddCardOption = popupAddCardForm.elements.cardUrlInput;

//Получить элементы попапа редактирования профиля
const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileForm = document.forms['profile-form'];
const popupProfileHeading = popupProfileForm.elements.profileNameInput;
const popupProfileOption = popupProfileForm.elements.ocupationInput;

//Кнопки закрытия попапов
const popupCloseButtons = document.querySelectorAll('.popup__button-close');

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
initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

//Функция добавления карточки
function addCard(heading, url) {
  const card = makeCardFromTemplate(heading, url, heading);
  //Добавить карточку в список
  cardsList.prepend(card);
}

//Ф-я получения карточки из шаблона
function makeCardFromTemplate(heading, url, alt) {
  //Получить элемент катрочки из шаблона
  const cardElement = cardTemplate
    .querySelector('.cards__card')
    .cloneNode(true);
  //Наполнить контентом элемент карточки
  const cardPhoto = cardElement.querySelector('.cards__photo');
  cardPhoto.src = url;
  cardPhoto.alt = alt;
  cardElement.querySelector('.cards__title').textContent = heading;
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
    showImagePopup(heading, url);
  });
  return cardElement;
}

//Ф-я открытия попапа редактирования профиля и наполнения его данынми
function showPopupProfile() {
  //Наполнить контентом элементы формы
  popupProfileHeading.value = profileName.textContent;
  popupProfileOption.value = profileOcupation.textContent;
  //проверить валидность формы
  сheckValidationForm(popupProfileForm);
  //скрыть сообщения о невалидности
  hideInputErors(popupProfileForm);
  //Показать попап
  showPopup(popupProfile);
}

//Ф-я открытия попапа изображения и наполнения его данынми
function showImagePopup(heading, url) {
  //Наполнить контентом элемент формы
  popupImageFigureImg.src = url;
  popupImageFigureImg.alt = heading;
  popupImageFigureCaption.textContent = heading;
  //Показать попап
  showPopup(popupImage);
}

//Ф-я открытия попапа добавления карточки и наполнения его данными
function showPopupAddCard() {
  //Очистить поля ввода формы
  popupAddCardForm.reset();
  //проверить валидность формы
  сheckValidationForm(popupAddCardForm);
  //скрыть сообщения о невалидности
  hideInputErors(popupAddCardForm);
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
  hideClosestPopup(evt);
}

//Ф-я создания карточки по данным из попапа
function handleAddCardFormSubmit(evt) {
  //заглушить стандартное действие submit
  evt.preventDefault();
  //Добавить новую карточку в список
  addCard(popupAddCardHeading.value, popupAddCardOption.value);
  //Закрыть попап
  hideClosestPopup(evt);
}

//Ф-я проверки валидности ввода
function handleCheckValidationInput(form, element) {
  //если инпут невалиден показать спан
  if (!element.validity.valid) {
    showErrorMsg(form, element);
  } else {
    //скрыть спан
    hideErrorMsg(form, element);
  }
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
}

//Ф-я закрытия попапа
function hideClosestPopup(evt) {
  hidePopup(evt.target.closest('.popup'));
}

//Ф-я скрытия попапа
function hidePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Ф-я проверки валидности формы
function сheckValidationForm(form) {
  if (!form.checkValidity()) {
    //блокировать кнопку Submit
    disableSubmitButton(form);
  } else {
    //разблокировать кнопку Submit
    enableSubmitButton(form);
  }
}

//Ф-я блокировки кнопки submit
function disableSubmitButton(form) {
  const button = form.querySelector('.popup__button-submit');
  button.disabled = true;
  //добавить класс неактивной кнопки
  button.classList.add('popup__button-submit_inactive');
}

//Ф-я разблокировки кнопки submit
function enableSubmitButton(form) {
  const button = form.querySelector('.popup__button-submit');
  button.disabled = false;
  //добавить класс неактивной кнопки
  button.classList.remove('popup__button-submit_inactive');
}

//Показать строку с ошибкой
function showErrorMsg(form, element) {
  //получить спан для отображения ошибки
  const inputError = form.querySelector(`.${element.name}-error`);
  //получить текст ошибку
  inputError.textContent = element.validationMessage;
  //добавить класс для отображения
  inputError.classList.add('popup__input-error_active');
  //добавить класс для инпута
  element.classList.add('popup__input_invalid');
}

//Скрыть строку с ошибкой
function hideErrorMsg(form, element) {
  //получить спан для отображения ошибки
  const inputError = form.querySelector(`.${element.name}-error`);
  inputError.textContent = '';
  //убрать класс для отображения
  inputError.classList.remove('popup__input-error_active');
  //убрать класс для инпута
  element.classList.remove('popup__input_invalid');
}

//Ф-я перебора всех инпутов и скрытия их ошибок
function hideInputErors(form) {
  Array.from(form.elements).forEach((element) => {
    if (element.nodeName === 'INPUT') {
      hideErrorMsg(form, element);
    }
  });
}

//Добавить событие нажатия редактировать
buttonEdit.addEventListener('click', showPopupProfile);
//Добавить событие нажатия добавить карточку
buttonAddCard.addEventListener('click', showPopupAddCard);

//Нажатие на кнопку закрыть попапа
popupCloseButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', hideClosestPopup);
});

//Добавить обработчики событий кнопоки сохранить (submit)
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
//Добавить обработчики событий кнопоки создать (submit)
popupAddCardForm.addEventListener('submit', handleAddCardFormSubmit);

//Добавить обработчик события input формы для ее валидации
popupAddCardForm.addEventListener('input', () => {
  сheckValidationForm(popupAddCardForm);
});
popupProfileForm.addEventListener('input', () => {
  сheckValidationForm(popupProfileForm);
});

//Добавить обработчики событий ввода на все инпуты всех форм для их валидации
Array.from(document.forms).forEach((form) => {
  Array.from(form.elements).forEach((element) => {
    if (element.nodeName === 'INPUT') {
      element.addEventListener('input', () => {
        handleCheckValidationInput(form, element);
      });
    }
  });
});
