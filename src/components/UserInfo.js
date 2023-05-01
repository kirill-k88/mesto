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
      profileNameInput: this._profileNameElement.textContent,
      ocupationInput: this._profileOcupationElement.textContent,
    };
  };

  getUserId = () => this._id;

  //Получить данные из объекта и отобразить
  setUserInfo = ({ name, about }) => {
    this._profileNameElement.textContent = name;
    this._profileOcupationElement.textContent = about;
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
