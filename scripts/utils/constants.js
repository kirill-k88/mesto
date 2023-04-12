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

//Набор классов и селекторов шаблона карточки
export const cardSelectorCollection = {
  template: '#Card',
  elementSelector: '.cards__card',
  pictureSelector: '.cards__photo',
  titleSelector: '.cards__title',
  buttonRemoveSelector: '.cards__button-remove',
  buttonLikeSelector: '.cards__button-like',
  buttonLikeActiveClass: 'cards__button-like_active',
};

//Набор селекторов для работы с попапом картинки
export const popupImageSelectorCollection = {
  popupSelector: '.popup_type_image',
  figureImgSelector: '.popup__image',
  figureCaptionSelector: '.popup__caption',
};

//CSS класс открытого попапа
export const popupIsOpenedClass = 'popup_opened';
//Селектор кнопки закрыть на попапах
export const closeButtonSelector = '.popup__button-close';
//Селекторы кнопок на странице
export const buttonEditSelector = '.profile__button-edit';
export const buttonAddCardSelector = '.profile__button-add';
//Селектор контейнера карточек
export const cardContainerSelector = '.cards__list';

//Набор селекторов и имен для работы с попапом редактирования профайла
export const popupProfileSelectorCollection = {
  popupSelector: '.popup_type_edit',
  popupFormName: 'profile-form',
  popupInputHeadingName: 'profileNameInput',
  popupInputOptionName: 'ocupationInput',
  popupButtonSubmitSelector: '.popup__button-submit',
};

//Набор селекторов текстов профайла
export const profileSelectorCollection = {
  profileNameSelector: '.profile__name',
  profileOcupationSelector: '.profile__ocupation',
};

//Набор селекторов и имен для работы с попапом добавления карточки
export const popupAddCardSelectorCollection = {
  popupSelector: '.popup_type_add',
  popupFormName: 'cardAdd-form',
  popupInputHeadingName: 'cardNameInput',
  popupInputOptionName: 'cardUrlInput',
  popupButtonSubmitSelector: '.popup__button-submit',
};

//Набор селекторов и классов для валидации форм
export const formSelectorCollection = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active',
};
