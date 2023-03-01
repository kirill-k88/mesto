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
const buttonClose = document.querySelector('.popup__button-close');
//Получить список карточек
const cardsList = document.querySelector('.cards__list');
//Получить форму
const popupElement = document.querySelector('.popup');
//Получить контейнер попапа
const popupContainer = popupElement.querySelector('.popup__container');
//Получить элемент попап
const popup = document.querySelector('.popup');
//Получить поле имя на странице
const profileName = document.querySelector('.profile__name');
//Получить поле имя на странице
const profileOcupation = document.querySelector('.profile__ocupation');

//Получить содержимое шаблона попапа редактирования
const editPopupTemplate = document.querySelector('#editPopup').content;
//Получить содержимое шаблона попапа добавления
const addCardPopupTemplate = document.querySelector('#addCardPopup').content;
//Получить содержимое шаблона карточки
const cardTemplate = document.querySelector('#Card').content;
//Получить содержимое шаблона попапа изображения
const imageTemplate = document.querySelector('#imagePopup').content;

//Добавить карточки из перечня по-умолчанию
initialCards.forEach((item) => {
  addCard(item.name, item.link, item.name);
});

//Функция добавления карточки
function addCard(heading, url, alt) {
  //Получить элемент катрочки из шаблона
  const cardElement = cardTemplate
    .querySelector('.cards__card')
    .cloneNode(true);
  //Наполнить контентом элемент карточки
  cardElement.querySelector('.cards__photo').src = url;
  cardElement.querySelector('.cards__photo').alt = alt;
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
  cardElement
    .querySelector('.cards__photo')
    .addEventListener('click', openImagePopup);
  //Добавить карточку в список карточек
  cardsList.prepend(cardElement);
}

//Ф-я открытия попапа редактирования профиля и наполнения его данынми
function openPopupEdit() {
  //Очистить попап
  removePopupContent();
  //Получить элемент формы из шаблона
  const editFormElement = editPopupTemplate
    .querySelector('.popup__form')
    .cloneNode(true);
  //Наполнить контентом элемент формы
  editFormElement.querySelector('.popup__input_content_heading').value =
    profileName.textContent;
  editFormElement.querySelector('.popup__input_content_option').value =
    profileOcupation.textContent;
  //Добавить обработчики событий кнопоки сохранить (submit)
  editFormElement.addEventListener('submit', saveForm);
  //Добавить форму в контейнер попапа
  popupContainer.append(editFormElement);
  //Показать попап
  showPopup();
}

//Ф-я сохранения значения, глушим стандартный обработчик
function saveForm(evt) {
  //заглушить стандартное действие submit
  evt.preventDefault();
  //Получить родительский элемент форму
  const form = evt.target.closest('.popup__form');
  //Добавить на экран значения
  profileName.textContent = form.querySelector(
    '.popup__input_content_heading'
  ).value;
  //добавить на экран значения
  profileOcupation.textContent = form.querySelector(
    '.popup__input_content_option'
  ).value;
  //Закрыть попап
  closePopupEdit();
}

function openImagePopup(evt) {
  //Очистить попап
  removePopupContent();
  //Получить родительский элемент карточку
  const card = evt.target.closest('.cards__card');
  //Получить данные карточки
  const url = card.querySelector('.cards__photo').src;
  const alt = card.querySelector('.cards__photo').alt;
  const caption = card.querySelector('.cards__title').textContent;
  //Получить элемент формы из шаблона
  const imageFigureElement = imageTemplate
    .querySelector('.popup__figure')
    .cloneNode(true);
  //Наполнить контентом элемент формы
  imageFigureElement.querySelector('.popup__image').src = url;
  imageFigureElement.querySelector('.popup__image').alt = alt;
  imageFigureElement.querySelector('.popup__caption').textContent = caption;
  //Добавить класс-модификатор для контейнера
  popupContainer.classList.add('popup__container_isImage');
  //Добавить класс-модификатор для попапа
  popup.classList.add('popup_isImage');
  //Добавить форму в контейнер попапа
  popupContainer.append(imageFigureElement);
  //Показать попап
  showPopup();
}

//Ф-я создания карточки по данным из попапа
function createCard(evt) {
  //заглушить стандартное действие submit
  evt.preventDefault();
  //Получить родительский элемент форму
  const form = evt.target.closest('.popup__form');
  //Получить значения полей
  const heading = form.querySelector('.popup__input_content_heading').value;
  const url = form.querySelector('.popup__input_content_option').value;
  //Добавить новую карточку в список
  addCard(heading, url, heading);
  //Закрыть попап
  closePopupEdit();
}

//Ф-я удаления карточки
function removeCard(evt) {
  evt.target.closest('.cards__card').remove();
}

//Ф-я снятия установки лайка
function toggleLike(evt) {
  evt.target.classList.toggle('cards__button-like_active');
}

//Ф-я открытия попапа добавления карточки и наполнения его данными
function openPopupAddCard() {
  //Очистить попап
  removePopupContent();
  //Получить элемент формы из шаблона
  const addCardFormElement = addCardPopupTemplate
    .querySelector('.popup__form')
    .cloneNode(true);
  //Добавить обработчики событий кнопоки создать (submit)
  addCardFormElement.addEventListener('submit', createCard);
  //Добавить форму в контейнер попапа
  popupContainer.append(addCardFormElement);
  //Показать попап
  showPopup();
}

//Ф-я визуализации попапа
function showPopup() {
  popup.classList.add('popup_opened');
}

//Ф-я закрытия попапа
function closePopupEdit() {
  popup.classList.remove('popup_opened');
}

//Ф-я удаления содержимого попапа
function removePopupContent() {
  //Удалить содержимое попап-контейнера
  if (popup.classList.contains('popup_isImage')) {
    if (popupContainer.querySelector('.popup__figure') !== null) {
      popupContainer.querySelector('.popup__figure').remove();
    }
    //Удалить класс-модификатор для контейнера
    popupContainer.classList.remove('popup__container_isImage');
    //Удалить класс-модификатор для попапа
    popup.classList.remove('popup_isImage');
  } else {
    if (popupContainer.querySelector('.popup__form') !== null) {
      popupContainer.querySelector('.popup__form').remove();
    }
  }
}

//Добавить событие нажатия редактировать
buttonEdit.addEventListener('click', openPopupEdit);
//Добавить событие нажатия добавить карточку
buttonAddCard.addEventListener('click', openPopupAddCard);
//Нажатие на кнопку закрыть попап
buttonClose.addEventListener('click', closePopupEdit);
