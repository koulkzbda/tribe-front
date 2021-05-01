import { TranslationService } from './../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { AuthService } from './../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit, OnDestroy {

  public userEmail: string;
  public token: string;
  public userId: string;
  public isSubmitReady$: BehaviorSubject<boolean>;
  public isReadySub: Subscription;
  private confirmationSub: Subscription;
  private langSub: Subscription;
  private messageTranslationSub: Subscription;
  private userEmailSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private translationService: TranslationService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getUserEmail();
    this.isSubmitReady$ = new BehaviorSubject<boolean>(false);
    this.updateLang();
    this.readRouteParameters();
    this.autoSubmit();
  }

  ngOnDestroy(): void {
    if (this.confirmationSub) this.confirmationSub.unsubscribe();
    if (this.messageTranslationSub) this.messageTranslationSub.unsubscribe();
    if (this.isReadySub) this.isReadySub.unsubscribe();
    this.langSub.unsubscribe();
    this.userEmailSub.unsubscribe();
  }

  private autoSubmit(): void {
    this.isReadySub = this.isSubmitReady$.subscribe(
      isReady => {
        if (isReady) {
          this.confirmationSub = this.authService.confirmEmail(this.token, this.userId).subscribe(
            user => {
              this.messageTranslationSub = this.translate.get('public.emailConfirmation.confirmationMessage').subscribe(
                message => {
                  this.snackBar.open(message, 'OK', {
                    duration: 80000,
                  });
                }
              );
              this.authService.setUserEmail(user.email);
              this.router.navigate(['/login']);
            }
          );
        }
      }
    );
  }

  private readRouteParameters(): void {
    this.route.params.subscribe(params => {
      const token = params['token'];
      const userId = params['id'];
      if (token) {
        this.token = token;
        this.isSubmitReady$.next(!!this.token && !!this.userId);
      }
      if (userId) {
        this.userId = userId;
        this.isSubmitReady$.next(!!this.token && !!this.userId);
      }
    }
    );
  }

  private getUserEmail(): void {
    this.userEmailSub = this.authService.userEmail$.subscribe(
      userEmail => this.userEmail = userEmail
    );
  }

  private updateLang(): void {
    this.translate.setDefaultLang(this.translationService.defaultLang);
    this.langSub = this.translationService.currentLang$.subscribe(
      lang => this.translate.use(lang)
    )
  }
}
