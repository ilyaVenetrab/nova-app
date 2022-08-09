import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';
import { AuthService, ILogin, IUser } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  public title$ = this._activatedRoute.data.pipe(pluck('title'));
  public loginMessage: string | null = null;

  public loginForm: any =  this._formBuilder.group({
    username: [
      null,
      {
        validators: Validators.required,
        updateOn: 'blur',
      }
    ],
    password: [
      null,
      {
        validators: Validators.required,
        updateOn: 'blur',
      }
    ]
  })

  public constructor(
    private _activatedRoute: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {
  }

  public login(user: IUser): void {
    this._authService.loginUser(user).subscribe((response: ILogin) => {
      if (response.success) {
        this._authService.tokenToLocalStorage(response);
      }

      this.loginMessage = response.message;
    });
  }
}
