import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ErrorResponse } from 'src/app/models/error-response.type';
import { SuccessResponse } from 'src/app/models/success-response.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    if (
      this.loginForm.valid &&
      this.loginForm.value.email &&
      this.loginForm.value.password
    ) {
      this.authService
        .logIn(
          this.loginForm.value.email,
          this.loginForm.value.password,
          !!this.loginForm.value.rememberMe
        )
        .subscribe({
          next: (data: SuccessResponse | ErrorResponse) => {
            let error = null;
            if ((data as ErrorResponse) !== undefined) {
              error = (data as ErrorResponse).message;
            }
            const loginResponse = data as SuccessResponse;
            if (
              !loginResponse.accessToken ||
              !loginResponse.refreshToken ||
              !loginResponse.userId
            ) {
              error = 'Auth error';
            }
            if (error) {
              alert(error);
              throw new Error(error);
            }
            this.authService.setTokens(
              loginResponse.accessToken,
              loginResponse.refreshToken
            );
            this.authService.userId = loginResponse.userId;
            this.router.navigate(['/']);
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              alert(errorResponse.error.message);
            } else {
              alert('Ошибка аутентификации');
            }
          },
        });
    }
  }
  loginTest() {
    this.authService.logInTest();
    this.router.navigate(['/']);
  }
}
