class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    try {
      return localStorage.getItem('token');
    } catch {
      return '';
    }
  }

  setToken(tokenData) {
    localStorage.setItem('token', tokenData);
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

  authorization(authData) {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(authData)
    });
  }

  identification(requestBody) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: Object.assign({}, this._headers, requestBody)
    });
  }
}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default auth;
