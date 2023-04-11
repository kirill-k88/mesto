export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  addItem = (element) => {
    this._containerElement.prepend(element);
  };

  renderItems = () => {
    this._items.forEach((item) => this._renderer(item));
  };
}
