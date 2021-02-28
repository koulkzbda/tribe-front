import { Subscription } from 'rxjs';
import { TranslationService } from './../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  langSub: Subscription;
  loginForm: FormGroup;
  hidePass = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private translationService: TranslationService,
    private translate: TranslateService
  ) {
  }

  get email(): AbstractControl { return this.loginForm.get('email'); }
  get password(): AbstractControl { return this.loginForm.get('password'); }

  ngOnInit(): void {
    this.initForm();
    this.updateLang();
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        // Validators.minLength(6),
      ]]
    });
  }

  private updateLang(): void {
    this.langSub = this.translationService.currentLang$.subscribe(
      lang => this.translate.use(lang)
    )
  }

  submit(): void {
    this.authService
      .login(this.email.value, this.password.value)
      .subscribe(
        _ => this.router.navigate(['/user']),
        _ => this.loginForm.reset()
      );
  }

  public triggerSubmit(event: any): void {
    event.preventDefault();
    if (this.loginForm.valid) {
      this.submit();
    }
  }

}
