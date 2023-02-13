//Получить кнопки показать и скрыть попап
let buttonEdit = document.querySelector(".profile__button-edit");
let buttonClose = document.querySelector(".popup__button-close");
//Получить форму
let formElement = document.querySelector(".popup__form");
//Получить поля ввода
let inputName = formElement.querySelector(".popup__input_name");
let inputOcupation = formElement.querySelector(".popup__input_ocupation");
//Получить элемент попап
let popup = document.querySelector(".popup");
//Получить поле имя на странице
let profileName = document.querySelector(".profile__name");
//Получить поле имя на странице
let profileOcupation = document.querySelector(".profile__ocupation");

//Переключить состояние видимости попапа
function togglePopupVisability() {
  popup.classList.toggle("popup_opened");
}

//Сохранить значения, глушим стандартный обработчик
function saveForm(evt) {
  //заглушить стандартное действие submit
  evt.preventDefault();
  //добавить на экран значения
  profileName.textContent = inputName.value;
  //добавить на экран значения
  profileOcupation.textContent = inputOcupation.value;
  //Закрыть попап
  togglePopupVisability();
}

//Добавить событие нажатия редактировать и закрыть
buttonEdit.addEventListener("click", togglePopupVisability);
buttonClose.addEventListener("click", togglePopupVisability);
//Нажатие на кнопку сохранить
formElement.addEventListener("submit", saveForm);
//Нажатие на кнопку Enter
formElement.addEventListener("keydown", function () {
  if (event.key == "Enter") {
    saveForm(event);
  }
});
