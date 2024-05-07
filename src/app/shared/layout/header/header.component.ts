import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ErrorResponse } from 'src/app/models/error-response.type';
import { Test } from 'src/app/models/test-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() posts: Test[] = [];
  isLogged: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });
  }

  logout() {
    this.authService.logOut().subscribe({
      next: () => {
        this.logOutGo();
      },
      error: () => {
        this.logOutGo();
      },
    });
  }

  logOutGo() {
    this.authService.removeTokens;
    this.authService.userId = null;
    this.router.navigate(['/']);
  }

  logoutTest() {
    this.authService.logOutTest();
    this.router.navigate(['/']);
  }
}
