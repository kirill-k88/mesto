//Набор классов и селекторов шаблона карточки
export const cardSelectorCollection = {
  template: '#Card',
  elementSelector: '.cards__card',
  pictureSelector: '.cards__photo',
  titleSelector: '.cards__title',
  buttonRemoveSelector: '.cards__button-remove',
  buttonRemoveVisibilityClass: 'cards__button-remove_hidden',
  buttonLikeSelector: '.cards__button-like',
  buttonLikeActiveClass: 'cards__button-like_active',
  likeCountSelector: '.cards__like-count',
};

//Набор селекторов для работы с попапом картинки
export const popupImageSelectorCollection = {
  popupSelector: '.popup_type_image',
  figureImgSelector: '.popup__image',
  figureCaptionSelector: '.popup__caption',
};

//CSS класс открытого попапа
export const popupIsOpenedClass = 'popup_opened';
//Селектор инпутов форм
const inputSelector = '.popup__input';
//Селектор кнопки закрыть на попапах
export const closeButtonSelector = '.popup__button-close';
//Селекторы кнопок на странице
export const buttonEditSelector = '.profile__button-edit';
export const buttonAddCardSelector = '.profile__button-add';
//Селектор контейнера карточек
export const cardContainerSelector = '.cards__list';

//Набор селекторов и имен для работы с попапом редактирования аватара
export const popupAvatarSelectorCollection = {
  popupSelector: '.popup_type_avatar',
  popupIsOpenedClass: popupIsOpenedClass,
  closeButtonSelector: closeButtonSelector,
  popupFormName: 'avatar-form',
  popupFormSelector: '.popup__form_type_avatar',
  inputSelector: inputSelector,
  popupButtonSubmitSelector: '.popup__button-submit',
};

//Набор селекторов и имен для работы с попапом редактирования профайла
export const popupProfileSelectorCollection = {
  popupSelector: '.popup_type_edit',
  popupIsOpenedClass: popupIsOpenedClass,
  closeButtonSelector: closeButtonSelector,
  popupFormName: 'profile-form',
  popupFormSelector: '.popup__form_type_edit',
  inputSelector: inputSelector,
  popupButtonSubmitSelector: '.popup__button-submit',
};

//Набор селекторов текстов профайла
export const profileSelectorCollection = {
  profileAvatar: '.profile__button-avatar',
  profileNameSelector: '.profile__name',
  profileOcupationSelector: '.profile__ocupation',
};

//Набор селекторов и имен для работы с попапом добавления карточки
export const popupAddCardSelectorCollection = {
  popupSelector: '.popup_type_add',
  popupIsOpenedClass: popupIsOpenedClass,
  closeButtonSelector: closeButtonSelector,
  popupFormName: 'cardAdd-form',
  popupFormSelector: '.popup__form_type_add',
  inputSelector: inputSelector,
  popupButtonSubmitSelector: '.popup__button-submit',
};

//Набор селекторов и имен для работы с попапом подтверждения
export const popupConfirmSelectorCollection = {
  popupSelector: '.popup_type_confirm',
  popupIsOpenedClass: popupIsOpenedClass,
  closeButtonSelector: closeButtonSelector,
  popupFormName: 'confirm-form',
  popupFormSelector: '.popup__form_type_confirm',
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
