import { Inject, Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface ICommon {
  success: boolean;
  message: string
}

export interface IVoteItem {
  _id: number;
  isMain: boolean;
  title: string;
  active: boolean
}

export interface IQuestion {
  title: string | undefined;
  revertButton: boolean;
  refresh: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
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

  public getCompanies(): Observable<IVoteItem[]> {
    return this._http.get('/companies').pipe(
      map((res: Object) => {
        return res as IVoteItem[];
      }),
      catchError(this._errorMgmt)
    );
  }

  public getQuestion(compTitle: string): Observable<IQuestion[]> {
    return this._http.get(`/questions?name=${compTitle}`).pipe(
      map((res: Object) => {
        return res as IQuestion[];
      }),
      catchError(this._errorMgmt)
    );
  }
}
