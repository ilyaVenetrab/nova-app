import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { BD_URL } from './shared/tokens';
import { SafeHtml } from '@angular/platform-browser';

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
  private _headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  public constructor(@Inject(BD_URL) private readonly _bdUrl: string, private _http: HttpClient) {}

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
    console.error(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  public getCompanies(): Observable<IVoteItem[]> {
    return this._http.get(`${this._bdUrl}/companies`,{
      headers: this._headers,
    }).pipe(
      map((res: Object) => {
        return res as IVoteItem[];
      }),
    );
  }

  public getQuestion(compTitle: string): Observable<IQuestion[]> {
    return this._http.get(`${this._bdUrl}/questions?name=${compTitle}`,{
      headers: this._headers,
    }).pipe(
      map((res: Object) => {
        return res as IQuestion[];
      }),
    );
  }
}
