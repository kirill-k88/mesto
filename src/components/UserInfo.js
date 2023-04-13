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
      inputHeading: this._profileNameElement.textContent,
      inputOption: this._profileOcupationElement.textContent,
    };
  };

  //Записать данные из объекта в тесты профайла
  setUserInfo = ({ inputHeading, inputOption }) => {
    this._profileNameElement.textContent = inputHeading;
    this._profileOcupationElement.textContent = inputOption;
  };
}
