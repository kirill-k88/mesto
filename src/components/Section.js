export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  //Ф-я добавления карточки в контейнер
  addItem = (element) => {
    this._containerElement.prepend(element);
  };

  //Ф-я отрисовки карточек из саписка
  renderItems = (items) => {
    this._items = items;
    console.log('_items', this._items);
    this._items.forEach(this._renderer);
  };
}
