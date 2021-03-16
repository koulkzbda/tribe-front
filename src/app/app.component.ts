import { AuthService } from './core/services/auth.service';
import { Subscription } from 'rxjs';
import { TranslationService } from './core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private langSub: Subscription;
  private loginSub: Subscription;

  constructor(
    private authService: AuthService,
    private translationService: TranslationService,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.updateLang();
    this.tryAutoLogin();
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  private updateLang(): void {
    this.translate.setDefaultLang(this.translationService.defaultLang);
    this.langSub = this.translationService.currentLang$.subscribe(
      lang => this.translate.use(lang)
    )
  }

  private tryAutoLogin(): void {
    const token = localStorage.getItem('token');
    const expirationDate = +localStorage.getItem('expirationDate');
    const now = new Date().getTime();

    if (token && now < expirationDate) {
      this.loginSub = this.authService.autoLogin().subscribe();
    }

  }

}
