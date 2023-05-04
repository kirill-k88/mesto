import Popup from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(
    {
      popupSelector,
      popupFormSelector,
      inputSelector,
      popupIsOpenedClass,
      closeButtonSelector,
      popupButtonSubmitSelector,
    },
    handleFormSubmit
  ) {
    super(popupSelector, popupIsOpenedClass, closeButtonSelector);

    //получить форму
    this._popupFormElement =
      this._popupElement.querySelector(popupFormSelector);

    //получить все инпуты
    this._inputList = this._popupFormElement.querySelectorAll(inputSelector);

    //функция обработки сабмита формы
    this._handleFormSubmit = handleFormSubmit;

    //Получить элемент кнопки сабмита
    this._buttonSubmitElement = this._popupFormElement.querySelector(
      popupButtonSubmitSelector
    );

    //Для унификации попапов сохраняем текст кнопки сабмита
    this._buttonSubmitText = this._buttonSubmitElement.textContent;
  }

  //Наполнить контентом элементы формы
  setInputValues(inputValues) {
    this._inputList.forEach((input) => {
      input.value = inputValues[input.name];
    });
  }

  //Получить тексты полей в объект
  _getInputValues = () => {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  };

  //переопределенная функция закрытия
  close() {
    //сброс полей формы
    this._popupFormElement.reset();
    super.close();
  }

  //Ф-я переключения текста кнопки при загрузке данных
  toggleSubmitButtonText() {
    if (this._buttonSubmitText != this._buttonSubmitElement.textContent) {
      this._buttonSubmitElement.textContent = this._buttonSubmitText;
    } else {
      this._buttonSubmitElement.textContent = 'Сохранение...';
    }
  }

  //Переопределенная ф-я установки листнеров
  setEventListeners() {
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
