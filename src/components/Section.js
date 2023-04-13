export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  //Ф-я добавления карточки в контейнер
  addItem = (element) => {
    this._containerElement.prepend(element);
  };

  //Ф-я отрисовки карточек из саписка
  renderItems = () => {
    this._items.forEach(this._renderer);
  };
}
