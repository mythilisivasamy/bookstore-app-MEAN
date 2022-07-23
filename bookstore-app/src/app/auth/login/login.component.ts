import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { stringValidator } from '../../shared/customValidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public authService: AuthService, private router: Router) {
    this.message = this.getMessage();
    }
  message: string;
    loginForm = new FormGroup({
    loginName: new FormControl('', [
      Validators.required,
      stringValidator(/^[a-zA-Z\s]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      stringValidator(/^[a-zA-Z\s]+$/),
    ]),
  });

  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login().subscribe(() => {
      this.message = this.getMessage();
      if (this.authService.isLoggedIn) {
        this.router.navigate([this.authService.redirectUrl]);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.message = this.getMessage();
  }
}
