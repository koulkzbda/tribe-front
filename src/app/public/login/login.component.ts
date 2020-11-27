import { AuthService } from './../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePass = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
      ]]
    });
  }

  get email(): AbstractControl { return this.loginForm.get('email'); }
  get password(): AbstractControl { return this.loginForm.get('password'); }

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a password';
    }

    return '';
  }

  submit(): void {
    this.authService
      .login(this.email.value, this.password.value)
      .subscribe(
        _ => this.router.navigate(['/user']),
        _ => this.loginForm.reset()
      );
  }

}
