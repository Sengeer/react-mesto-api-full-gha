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

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
  }

  patchUserInfo(userDataValue) {
    const {
      name = '',
      description = '',
      avatarLink = ''
    } = userDataValue;
    if (name && description) {
      return this._request(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: description
        })
      });
    } else if (avatarLink) {
      return this._request(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarLink
        })
      });
    };
  }

  addNewCard(cardDataValue) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardDataValue)
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      });
    } else {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      });
    };
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '8eb2c5a1-7216-4743-9490-cbf6391354bb',
    'Content-Type': 'application/json'
  }
});

export default api;
