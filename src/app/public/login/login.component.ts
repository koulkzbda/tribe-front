import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessage, ErrorCode } from './../../shared/models/utils/error-message';
import { Subscription } from 'rxjs';
import { TranslationService } from './../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCreation } from 'src/app/shared/models/user-creation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private langSub: Subscription;
  private messageTranslationSub: Subscription;
  private message2TranslationSub: Subscription;
  private userEmailSub: Subscription;
  private sendEmailSub: Subscription;
  public errorMessage: ErrorMessage;
  public loginForm: FormGroup;
  public hidePass = true;
  public message: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private translationService: TranslationService,
    private translate: TranslateService,
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
    this.userEmailSub.unsubscribe();
    if (this.sendEmailSub) this.sendEmailSub.unsubscribe();
    if (this.messageTranslationSub) this.messageTranslationSub.unsubscribe();
    if (this.message2TranslationSub) this.message2TranslationSub.unsubscribe();
  }

  public goToForgetPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  private initForm(): void {
    this.userEmailSub = this.authService.userEmail$.subscribe(
      userEmail => {
        this.loginForm = this.fb.group({
          email: [userEmail, [
            Validators.required,
            Validators.email
          ]],
          password: ['', [
            Validators.required,
          ]]
        });
      }
    )


  }

  private updateLang(): void {
    this.translate.setDefaultLang(this.translationService.defaultLang);
    this.langSub = this.translationService.currentLang$.subscribe(
      lang => this.translate.use(lang)
    )
  }

  public submit(): void {
    this.authService
      .login(this.email.value, this.password.value)
      .subscribe(
        user => {
          if (user.firstSystemCreated) {
            this.router.navigate(['/user/feedbuzz'])
          } else {
            this.router.navigate(['/user/welcome']);
          }
        },
        response => {
          console.log(response)
          if (response?.error?.code == ErrorCode.NOT_CONFIRMED) {
            this.errorMessage = response.error;
            this.messageTranslationSub = this.messageTranslationSub = this.translate.get('public.emailConfirmation.confirmationEmailHasBeenSent', { email: this.errorMessage.message }).subscribe(
              message => {
                this.message = message;
              }
            );
          } else {
            this.loginForm.reset();
          }
        }
      );
  }

  public triggerSubmit(event: any): void {
    event.preventDefault();
    if (this.loginForm.valid) {
      this.submit();
    }
  }

  public onAction(): void {
    this.sendEmailSub = this.authService
      .sendEmailConfirmation(new UserCreation(null, null, this.errorMessage.message))
      .subscribe(user => {
        this.message2TranslationSub = this.translate.get('public.login.confirmationEmailResent', { email: user.email }).subscribe(
          message => {
            this.snackBar.open(message, 'OK', {
              duration: 80000,
            });
          }
        );

      });
  }

}
