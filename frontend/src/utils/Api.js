const MODE = process.env.REACT_APP_MODE;
const BASE_URL = process.env.REACT_APP_BASE_URL;

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

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: Object.assign({}, this._headers),
      credentials: 'include'
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
        headers: Object.assign({}, this._headers),
        body: JSON.stringify({
          name: name,
          about: description
        }),
        credentials: 'include'
      });
    } else if (avatarLink) {
      return this._request(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: Object.assign({}, this._headers),
        body: JSON.stringify({
          avatar: avatarLink
        }),
        credentials: 'include'
      });
    };
  }

  addNewCard(cardDataValue) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: Object.assign({}, this._headers),
      body: JSON.stringify(cardDataValue),
      credentials: 'include'
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: Object.assign({}, this._headers),
      credentials: 'include'
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: Object.assign({}, this._headers),
        credentials: 'include'
      });
    } else {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: Object.assign({}, this._headers),
        credentials: 'include'
      });
    };
  }
}

const api = new Api({
  baseUrl: MODE === 'production' ? BASE_URL : 'http://localhost:30001',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
