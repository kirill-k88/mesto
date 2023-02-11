//Получить кнопки лайков всех карточек
let buttonLikes = document.querySelectorAll(".cards__button-like");

//Изменить svg-картинку лайка на карточке при нажатии
buttonLikes.forEach((buttonLike) => {
  buttonLike.addEventListener("click", function () {
    let likeSvg = buttonLike.querySelector(".cards__button-like-svg");
    likeSvg.classList.toggle("cards__button-like-svg_active");
  });
});

//Получить кнопки показать и скрыть попап
let buttonEdit = document.querySelector(".profile__button-edit");
let buttonClose = document.querySelector(".popup__button-close");

//Добавить событие нажатия
buttonEdit.addEventListener("click", togglePopupVisability);
buttonClose.addEventListener("click", togglePopupVisability);

//Переключить состояние видимости попапа
function togglePopupVisability() {
  let popup = document.querySelector(".popup");
  popup.classList.toggle("popup_opened");
}

//Получить форму
let formElement = document.querySelector(".popup__form");

//Получить поля ввода
let inputName = formElement.querySelector(".popup__input_name");
let inputOcupation = formElement.querySelector(".popup__input_ocupation");

//Нажатие на кнопку сохранить
formElement.addEventListener("submit", saveForm);

//Нажатие на кнопку Enter
formElement.addEventListener("keydown", function () {
  if (event.key == "Enter") {
    saveForm(event);
  }
});

//Сохранить значения, глушим стандартный обработчик
function saveForm(evt) {
  //глушим стандартное действие submit
  evt.preventDefault();

  //Получить поле имя на странице
  let profileName = document.querySelector(".profile__name");
  //добавляем на экран значения
  profileName.textContent = inputName.value;

  //Получить поле имя на странице
  let profileOcupation = document.querySelector(".profile__ocupation");
  //добавляем на экран значения
  profileOcupation.textContent = inputOcupation.value;
}
