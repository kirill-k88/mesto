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
