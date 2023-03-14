//Набор селекторов и классов для валидации
export const selectorsCollectionObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active',
};

function enableValidation(selectorsCollection) {
  const formsList = document.querySelectorAll(selectorsCollection.formSelector);
  //Добавить обработчики событий ввода на все инпуты всех форм для их валидации
  Array.from(formsList).forEach((form) => {
    const inputsList = form.querySelectorAll(selectorsCollection.inputSelector);
    Array.from(inputsList).forEach((element) => {
      element.addEventListener('input', () => {
        handleCheckValidationInput(form, element, selectorsCollection);
      });
    });
    //Добавить обработчик события input формы для ее валидации
    form.addEventListener('input', () => {
      checkValidationForm(form, selectorsCollection);
    });
  });
}

//Ф-я блокировки кнопки submit
function disableSubmitButton(form, selectorsCollection) {
  const button = form.querySelector(selectorsCollection.submitButtonSelector);
  button.disabled = true;
  //добавить класс неактивной кнопки
  button.classList.add(selectorsCollection.inactiveButtonClass);
}

//Ф-я разблокировки кнопки submit
function enableSubmitButton(form, selectorsCollection) {
  const button = form.querySelector(selectorsCollection.submitButtonSelector);
  button.disabled = false;
  //добавить класс неактивной кнопки
  button.classList.remove(selectorsCollection.inactiveButtonClass);
}

//Ф-я проверки валидности ввода
function handleCheckValidationInput(form, element, selectorsCollection) {
  //если инпут невалиден показать спан
  if (!element.validity.valid) {
    showErrorMsg(form, element, selectorsCollection);
  } else {
    //скрыть спан
    hideErrorMsg(form, element, selectorsCollection);
  }
}

//Показать строку с ошибкой
function showErrorMsg(form, element, selectorsCollection) {
  //получить спан для отображения ошибки
  const inputError = form.querySelector(`.${element.name}-error`);
  //получить текст ошибку
  inputError.textContent = element.validationMessage;
  //добавить класс для отображения ошибки
  inputError.classList.add(selectorsCollection.errorClass);
  //добавить класс для инпута
  element.classList.add(selectorsCollection.inputErrorClass);
}

//Скрыть строку с ошибкой
function hideErrorMsg(form, element, selectorsCollection) {
  //получить спан для отображения ошибки
  const inputError = form.querySelector(`.${element.name}-error`);
  inputError.textContent = '';
  //убрать класс для отображения
  inputError.classList.remove(selectorsCollection.errorClass);
  //убрать класс для инпута
  element.classList.remove(selectorsCollection.inputErrorClass);
}

//Ф-я перебора всех инпутов и скрытия их ошибок
export function hideInputErors(form, selectorsCollection) {
  const inputsList = form.querySelectorAll(selectorsCollection.inputSelector);
  Array.from(inputsList).forEach((element) => {
    hideErrorMsg(form, element, selectorsCollection);
  });
}

//Ф-я проверки валидности формы
export function checkValidationForm(form, selectorsCollection) {
  if (!form.checkValidity()) {
    //блокировать кнопку Submit
    disableSubmitButton(form, selectorsCollection);
  } else {
    //разблокировать кнопку Submit
    enableSubmitButton(form, selectorsCollection);
  }
}

//Включить валиацию форм
enableValidation(selectorsCollectionObj);
