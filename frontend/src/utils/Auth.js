class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  removeAuthCheck() {
    localStorage.removeItem('authorized');
  }

  getAuthCheck() {
    try {
      return localStorage.getItem('authorized');
    } catch {
      return '';
    }
  }

  setAuthCheck(isAuth) {
    localStorage.setItem('token', isAuth);
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

  register(registerData) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(registerData)
    });
  }

  authorization(requestBody) {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(requestBody),
      credentials: "include"
    });
  }

  identification() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: Object.assign({}, this._headers),
      credentials: "include"
    });
  }
}

const auth = new Auth({
  baseUrl: 'https://api.mesto.sengeer.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default auth;
