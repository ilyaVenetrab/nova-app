import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { AuthService, ILogin } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(
    _activatedRoute: ActivatedRouteSnapshot,
    router: RouterStateSnapshot,): Observable<boolean>
  {
    return this._authService.getTokenFromLocalStorage().pipe(
      take(1),
      switchMap((id) => {
        if (!id && router.url === '/admin/dashboard') {
          this._router.navigate(['/dashboard']);
          return of(false);
        }

        if (id && router.url === '/admin/login') {
          this._router.navigate(['/admin/dashboard']);
          return of(true);
        }

        return of(true);
      }
    ));
  }

}
