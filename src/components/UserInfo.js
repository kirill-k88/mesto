export class UserInfo {
  constructor({
    profileAvatar,
    profileNameSelector,
    profileOcupationSelector,
  }) {
    this._profileAvatarElement = document.querySelector(profileAvatar);
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileOcupationElement = document.querySelector(
      profileOcupationSelector
    );
  }

  //Получить данные пользователя в объект
  getUserInfo = () => {
    return {
      profileNameInput: this._name,
      ocupationInput: this._about,
    };
  };

  getUserId = () => this._id;

  //Получить данные из объекта и отобразить
  setUserInfo = ({ name, about }) => {
    this._name = name;
    this._about = about;
    this._renderUserInfo();
  };

  //Отобразить данные пользователя на экране
  _renderUserInfo = () => {
    this._profileNameElement.textContent = this._name;
    this._profileOcupationElement.textContent = this._about;
  };

  setAvatar = (url) => {
    this._profileAvatarElement.style.backgroundImage = `url(${url})`;
  };

  getAvatarElement = () => this._profileAvatarElement;

  //Получить данные пользователя в экземпляр и отобразить
  //Выполняется только при загрузке страницы
  setUser = ({ name, about, _id, avatar }) => {
    this.setUserInfo({ name, about });
    this._id = _id;
    this.setAvatar(avatar);
  };
}
