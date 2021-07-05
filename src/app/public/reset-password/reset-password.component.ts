import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslationService } from './../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { passwordValidator } from './../../shared/validators/password-validator';
import { AuthService } from './../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  private langSub: Subscription;
  private messageTranslationSub: Subscription;
  public token: string;
  public userId: number;
  public passwordForm: FormGroup;
  public hidePass1 = true;
  public hidePass2 = true;
  public minPw = 8;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private translationService: TranslationService,
    private translate: TranslateService,
    private authService: AuthService
  ) { }

  get password1(): AbstractControl { return this.passwordForm.get('password1'); }
  get password2(): AbstractControl { return this.passwordForm.get('password2'); }

  ngOnInit(): void {
    this.updateLang();
    this.initForm();
    this.readRouteParameters();
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
    if (this.messageTranslationSub) this.messageTranslationSub.unsubscribe();
  }

  public submit(): void {
    if (this.token) {
      this.authService
        .resetPassword(this.passwordForm)
        .subscribe(
          user => {
            this.router.navigate(['/login']);
            this.authService.setUserEmail(user.email);
            this.messageTranslationSub = this.translate.get('public.reset-password.success').subscribe(
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

  }

  public triggerSubmit(event: any): void {
    event.preventDefault();
    if (this.passwordForm.valid) {
      this.submit();
    }
  }

  public onPasswordInput() {
    if (this.passwordForm.hasError('passwordsNotEqual'))
      this.password2.setErrors([{ 'passwordsNotEqual': true }]);
    else
      this.password2.setErrors(null);
  }

  private readRouteParameters(): void {
    this.route.params.subscribe(params => {
      const token = params['token'];
      const userId = params['id'];
      if (token) {
        this.token = token;
        this.passwordForm.addControl('token', new FormControl(this.token, [Validators.required]));
      }
      if (userId) {
        this.userId = userId;
        this.passwordForm.addControl('id', new FormControl(this.userId, [Validators.required]));
      }
    }
    );
  }

  private initForm(): void {
    this.passwordForm = this.fb.group({
      password1: ['', [
        Validators.required,
        Validators.minLength(this.minPw),
      ]],
      password2: ['', [
        Validators.required,
        Validators.minLength(this.minPw),
      ]]
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

}
