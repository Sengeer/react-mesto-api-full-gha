class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers
    });
  }

  getInitialCards(authData) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: Object.assign({}, this._headers, authData)
    });
  }

  patchUserInfo(userDataValue, authData) {
    const {
      name = '',
      description = '',
      avatarLink = ''
    } = userDataValue;
    if (name && description) {
      return this._request(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: Object.assign({}, this._headers, authData),
        body: JSON.stringify({
          name: name,
          about: description
        })
      });
    } else if (avatarLink) {
      return this._request(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: Object.assign({}, this._headers, authData),
        body: JSON.stringify({
          avatar: avatarLink
        })
      });
    };
  }

  addNewCard(cardDataValue, authData) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: Object.assign({}, this._headers, authData),
      body: JSON.stringify(cardDataValue)
    });
  }

  deleteCard(cardId, authData) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: Object.assign({}, this._headers, authData),
    });
  }

  changeLikeCardStatus(cardId, isLiked, authData) {
    if (isLiked) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: Object.assign({}, this._headers, authData)
      });
    } else {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: Object.assign({}, this._headers, authData)
      });
    };
  }
}

const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  baseUrl: 'http://localhost:3000',
  // baseUrl: 'http://mesto.sengeer.nomoredomainsrocks.ru',
  headers: {
    // authorization: '8eb2c5a1-7216-4743-9490-cbf6391354bb',
    'Content-Type': 'application/json'
  }
});

export default api;