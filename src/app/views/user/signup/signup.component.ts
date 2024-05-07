import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ErrorResponse } from 'src/app/models/error-response.type';
import { SuccessResponse } from 'src/app/models/success-response.type';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    passwordRepeat: ['', [Validators.required]],
    rememberMe: [false],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  signup() {
    if (
      this.signupForm.valid &&
      this.signupForm.value.email &&
      this.signupForm.value.username &&
      this.signupForm.value.password &&
      this.signupForm.value.passwordRepeat
    ) {
      this.authService
        .signUp(
          this.signupForm.value.email,
          this.signupForm.value.password,
          this.signupForm.value.passwordRepeat
        )
        .subscribe({
          next: (data: ErrorResponse | SuccessResponse) => {
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
              alert('Ошибка регистрации');
            }
          },
        });
    }
  }

  signupTest() {
    this.authService.signUpTest();
    this.router.navigate(['/']);
  }
}
