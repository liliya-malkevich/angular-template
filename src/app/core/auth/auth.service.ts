import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { ErrorResponse } from 'src/app/models/error-response.type';
import { SuccessResponse } from 'src/app/models/success-response.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public accessTokenKey: string = 'accessToken';
  public refreshTokenKey: string = 'refreshToken';
  public userIdKey: string = 'userId';

  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);
  }

  logIn(
    email: string,
    password: string,
    rememberMe: boolean
  ): Observable<ErrorResponse | SuccessResponse> {
    return this.http.post<ErrorResponse | SuccessResponse>(
      environment.auth + 'login',
      {
        email,
        password,
        rememberMe,
      }
    );
  }

  logOut(): Observable<ErrorResponse> {
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<ErrorResponse>(environment.auth + 'logout', {
        refreshToken: tokens.refreshToken,
      });
    }
    throw throwError(() => 'Can not find token');
  }

  signUp(
    email: string,
    password: string,
    passwordRepeat: string
  ): Observable<ErrorResponse | SuccessResponse> {
    return this.http.post<ErrorResponse | SuccessResponse>(
      environment.auth + 'signup',
      {
        email,
        password,
        passwordRepeat,
      }
    );
  }

  logInTest() {
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  logOutTest() {
    this.isLogged = false;
    this.isLogged$.next(false);
  }

  signUpTest() {
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  public getIsLoggedIn() {
    return this.isLogged;
  }

  public setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  public removeTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.isLogged = false;
    this.isLogged$.next(false);
  }

  public getTokens() {
    return {
      accessToken: localStorage.getItem(this.accessTokenKey),
      refreshToken: localStorage.getItem(this.refreshTokenKey),
    };
  }

  get userId(): null | string {
    return localStorage.getItem(this.userIdKey);
  }

  set userId(id: string | null) {
    if (id) {
      localStorage.setItem(this.userIdKey, id);
    } else {
      localStorage.removeItem(this.userIdKey);
    }
  }
}
