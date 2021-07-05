import { TranslationService } from './../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../core/services/auth.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  private langSub: Subscription;
  private messageTranslationSub: Subscription;
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private translationService: TranslationService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.updateLang();
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
    if (this.messageTranslationSub) this.messageTranslationSub.unsubscribe();
  }

  get email(): AbstractControl { return this.passwordForm.get('email'); }

  public submit(): void {
    this.authService
      .sendResetPaswordEmail(this.email.value)
      .subscribe(
        user => {
          this.messageTranslationSub = this.translate.get('public.forgot-password.success', { email: user.email }).subscribe(
            message => {
              this.snackBar.open(message, 'OK', {
                duration: 80000,
                panelClass: 'dark-snackbar'
              });
            }
          );
        },
        _ => this.passwordForm.reset()
      );
  }

  private initForm(): void {
    this.passwordForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  private updateLang(): void {
    this.translate.setDefaultLang(this.translationService.defaultLang);
    this.langSub = this.translationService.currentLang$.subscribe(
      lang => this.translate.use(lang)
    )
  }

}
