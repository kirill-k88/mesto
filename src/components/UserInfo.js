export class UserInfo {
  constructor({ profileNameSelector, profileOcupationSelector }) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileOcupationElement = document.querySelector(
      profileOcupationSelector
    );
  }

  //Получить данные из тестов профайла в объект
  getUserInfo = () => {
    return {
      profileNameInput: this._profileNameElement.textContent,
      ocupationInput: this._profileOcupationElement.textContent,
    };
  };

  //Записать данные из объекта в тесты профайла
  setUserInfo = ({ profileNameInput, ocupationInput }) => {
    this._profileNameElement.textContent = profileNameInput;
    this._profileOcupationElement.textContent = ocupationInput;
  };
}
