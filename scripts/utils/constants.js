//Карточки по-умолчанию
export const initialCards = [
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

//Объект конфигурация с набором классов и селекторов шаблона карточки
export const cardSelectorCollection = {
  template: '#Card',
  elementSelector: '.cards__card',
  pictureSelector: '.cards__photo',
  titleSelector: '.cards__title',
  buttonRemoveSelector: '.cards__button-remove',
  buttonLikeSelector: '.cards__button-like',
  buttonLikeActiveClass: 'cards__button-like_active',
};

//Получить элемент попап изображения
/* const popupImage = document.querySelector('.popup_type_image');
const popupImageFigureImg = popupImage.querySelector('.popup__image');
const popupImageFigureCaption = popupImage.querySelector('.popup__caption'); */
export const popupImageSelectorCollection = {
  popupSelector: '.popup_type_image',
  closeButtonSelector: '.popup__button-close',
  figureImgSelector: '.popup__image',
  figureCaptionSelector: '.popup__caption',
};
