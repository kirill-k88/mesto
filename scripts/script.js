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
const popupAdd = document.querySelector('.popup_type_add');
const popupAddHeading = popupAdd.querySelector('.popup__input_content_heading');
const popupAddOption = popupAdd.querySelector('.popup__input_content_option');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddClose = popupAdd.querySelector('.popup__button-close');

//Получить элементы попапа редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditHeading = popupEdit.querySelector(
  '.popup__input_content_heading'
);
const popupEditOption = popupEdit.querySelector('.popup__input_content_option');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditClose = popupEdit.querySelector('.popup__button-close');

//Получить элемент попап изображения
const popupImage = document.querySelector('.popup_type_image');
const popupImageFigureImg = popupImage.querySelector('.popup__image');
const popupImageFigureCaption = popupImage.querySelector('.popup__caption');
const popupImageClose = popupImage.querySelector('.popup__button-close');

//Получить поле имя на странице
const profileName = document.querySelector('.profile__name');
//Получить поле имя на странице
const profileOcupation = document.querySelector('.profile__ocupation');

//Получить содержимое шаблона карточки
const cardTemplate = document.querySelector('#Card').content;

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
  //Наполнить контентом элементы формы
  popupEditHeading.value = profileName.textContent;
  popupEditOption.value = profileOcupation.textContent;
  //Показать попап
  showPopup(popupEdit);
}

//Ф-я открытия попапа изображения и наполнения его данынми
function openImagePopup(evt) {
  //Получить родительский элемент карточку
  const card = evt.target.closest('.cards__card');
  //Получить данные карточки
  const url = card.querySelector('.cards__photo').src;
  const alt = card.querySelector('.cards__photo').alt;
  const caption = card.querySelector('.cards__title').textContent;
  //Наполнить контентом элемент формы
  popupImageFigureImg.src = url;
  popupImageFigureImg.alt = alt;
  popupImageFigureCaption.textContent = caption;
  //Показать попап
  showPopup(popupImage);
}

//Ф-я открытия попапа добавления карточки и наполнения его данными
function openPopupAddCard() {
  //Показать попап
  showPopup(popupAdd);
}

//Ф-я сохранения значения, глушим стандартный обработчик
function saveForm(evt) {
  //заглушить стандартное действие submit
  evt.preventDefault();
  //Добавить на экран значения
  profileName.textContent = popupEditHeading.value;
  //добавить на экран значения
  profileOcupation.textContent = popupEditOption.value;
  //Закрыть попап
  closePopup(evt);
}

//Ф-я создания карточки по данным из попапа
function createCard(evt) {
  //заглушить стандартное действие submit
  evt.preventDefault();
  //Получить значения полей
  const heading = popupAddHeading.value;
  const url = popupAddOption.value;
  //Добавить новую карточку в список
  addCard(heading, url, heading);
  //Закрыть попап
  closePopup(evt);
  //Очистить поля ввода формы
  evt.target.reset();
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
function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

//Добавить событие нажатия редактировать
buttonEdit.addEventListener('click', openPopupEdit);
//Добавить событие нажатия добавить карточку
buttonAddCard.addEventListener('click', openPopupAddCard);

//Нажатие на кнопку закрыть попап добавления
popupAddClose.addEventListener('click', closePopup);
//Нажатие на кнопку закрыть попап редактирования
popupEditClose.addEventListener('click', closePopup);
//Нажатие на кнопку закрыть попап изображения
popupImageClose.addEventListener('click', closePopup);

//Добавить обработчики событий кнопоки сохранить (submit)
popupEditForm.addEventListener('submit', saveForm);
//Добавить обработчики событий кнопоки создать (submit)
popupAddForm.addEventListener('submit', createCard);
