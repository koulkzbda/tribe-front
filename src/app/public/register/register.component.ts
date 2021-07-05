import { MatSnackBar } from '@angular/material/snack-bar';
import { passwordValidator } from './../../shared/validators/password-validator';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './../../core/services/translation.service';
import { AuthService } from './../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Validators, AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  langSub: Subscription;
  registerForm: FormGroup;
  hidePass1 = true;
  hidePass2 = true;
  public minPw = 8;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private translationService: TranslationService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {
  }

  get firstName(): AbstractControl { return this.registerForm.get('firstName'); }
  get lastName(): AbstractControl { return this.registerForm.get('lastName'); }
  get email(): AbstractControl { return this.registerForm.get('email'); }
  get password(): AbstractControl { return this.registerForm.get('password'); }
  get passwordConfirm(): AbstractControl { return this.registerForm.get('passwordConfirm'); }

  ngOnInit(): void {
    this.initForm();
    this.updateLang();
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }

  public onPasswordInput() {
    if (this.registerForm.hasError('passwordsNotEqual'))
      this.passwordConfirm.setErrors([{ 'passwordsNotEqual': true }]);
    else
      this.passwordConfirm.setErrors(null);
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ]+[A-Za-zÀ-ÖØ-öø-ÿ '-]*[A-Za-zÀ-ÖØ-öø-ÿ]$/)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ]+[A-Za-zÀ-ÖØ-öø-ÿ '-]*[A-Za-zÀ-ÖØ-öø-ÿ]$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(this.minPw),
      ]],
      passwordConfirm: ['', [
        Validators.required,
      ]],
    },
      { validators: passwordValidator }
    );
  }

  private updateLang(): void {
    this.translate.setDefaultLang(this.translationService.defaultLang);
    this.langSub = this.translationService.currentLang$.subscribe(
      lang => this.translate.use(lang)
    )
  }

  submit(): void {
    this.authService
      .register(this.registerForm.value)
      .subscribe(
        user => {
          this.authService.setUserEmail(user.email);
          this.router.navigate(['/email-confirmation']);
        },
        err => this.snackBar.open(err.error.message, 'OK', {
          duration: 60000,
          panelClass: 'dark-snackbar'
        })
      );
  }

  public triggerSubmit(event: any): void {
    event.preventDefault();
    if (this.registerForm.valid) {
      this.submit();
    }
  }

}
