import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  username = 'notLoggedIn';
  constructor() {
    if (this.isLoggedIn()) {
      this.username = this.getUserInfo().username;
    }
  }
  getToken() {
    const token = localStorage.getItem('token');
    return ((token && token !== undefined) ? token : '');
  }

  setToken(token) {
    if (token && token !== undefined) {
      localStorage.setItem('token', token);
    }
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return ((token && token !== undefined) ? true : false);
  }

  setUserInfo(user) {
    this.setToken(user.token);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('uername', user.username);
    localStorage.setItem('userEmail', user.email);
    this.username
      = user.username;
  }

  getUserInfo() {
    if (this.isLoggedIn()) {
      return {
        id: localStorage.getItem('userId'),
        username: localStorage.getItem('uername'),
        email: localStorage.getItem('userEmail'),
      };
    }
    return null;
  }

  clearUserInfo() {
    localStorage.removeItem('userId');
    localStorage.removeItem('uername');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    this.username = 'you are not signin';
  }
}

