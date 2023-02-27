//Получить кнопки показать и скрыть попап
let buttonEdit = document.querySelector(".profile__button-edit");
let buttonClose = document.querySelector(".popup__button-close");
//Получить форму
let formElement = document.querySelector(".popup__form");
//Получить поля ввода
let inputHeading = formElement.querySelector(".popup__input_content_heading");
let inputOption = formElement.querySelector(".popup__input_content_option");
//Получить элемент попап
let popup = document.querySelector(".popup");
//Получить поле имя на странице
let profileName = document.querySelector(".profile__name");
//Получить поле имя на странице
let profileOcupation = document.querySelector(".profile__ocupation");

//Переключить состояние видимости попапа
/* function togglePopupVisability() {
  popup.classList.toggle("popup_opened");
  popup.classList.contains;
  //добавить в попап значения
  inputHeading.value = profileName.textContent;
  //добавить в попапзначения
  inputOption.value = profileOcupation.textContent;
} */

function openPopupEdit() {
  popup.classList.add("popup_opened");
  //добавить в попап значения
  inputHeading.value = profileName.textContent;
  //добавить в попапзначения
  inputOption.value = profileOcupation.textContent;
}

function closePopupEdit() {
  popup.classList.remove("popup_opened");
}

//Сохранить значения, глушим стандартный обработчик
function saveForm(evt) {
  //заглушить стандартное действие submit
  evt.preventDefault();
  //добавить на экран значения
  profileName.textContent = inputHeading.value;
  //добавить на экран значения
  profileOcupation.textContent = inputOption.value;
  //Закрыть попап
  closePopupEdit();
}

//Добавить событие нажатия редактировать и закрыть
buttonEdit.addEventListener("click", openPopupEdit);
buttonClose.addEventListener("click", closePopupEdit);
//Нажатие на кнопку сохранить
formElement.addEventListener("submit", saveForm);
