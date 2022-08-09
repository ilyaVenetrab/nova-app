import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ICommon } from '../../app.service';

export interface IUser {
  username: string;
  password: string;
  _id: number;
}

export interface ILogin extends ICommon, IUser {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public constructor(private _http: HttpClient) {}

  // Error handling
  private _errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }

  public loginUser(user: IUser): Observable<ILogin> {
    return this._http.post(`/auth/signin`, user).pipe(
      map((res: Object) => {
        return res as ILogin;
      }),
      catchError(this._errorMgmt)
    )
  }

  public verifyToken(): Observable<ILogin> {
    return this._http.get(`/test/user`).pipe(
      map((res: Object) => {
        return res as ILogin;
      }),
      catchError(this._errorMgmt)
    )
  }

  public tokenToLocalStorage(user: ILogin): void {
    localStorage.setItem('accessToken', user.accessToken);
  }

  public getTokenFromLocalStorage(): Observable<string | null> {
    return of(localStorage.getItem('accessToken'));
  }
}
