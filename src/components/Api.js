export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      this._getResponseData
    );
  };

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      this._getResponseData
    );
  };

  modifyUserInfo = (userObject) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userObject),
    }).then(this._getResponseData);
  };

  sendNewCard = (userObject) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(userObject),
    }).then(this._getResponseData);
  };

  deleteCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponseData);
  };

  sendLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._getResponseData);
  };

  deleteLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponseData);
  };

  modifyAvatar = (avatarObj) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatarObj),
    }).then(this._getResponseData);
  };
}
