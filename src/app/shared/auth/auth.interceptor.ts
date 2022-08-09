import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BD_URL } from '../tokens';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public constructor(@Inject(BD_URL) private readonly _bdUrl: string, private _authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this._authService.getTokenFromLocalStorage().pipe((accessToken) => {
      const headers = request.headers.append('Content-Type', 'application/json');

      const url = request.url;

      const req = request.clone({
        url: `${this._bdUrl}${url}`,
        headers,
        withCredentials: true
      });

      return next.handle(req);
    });
  }
}
