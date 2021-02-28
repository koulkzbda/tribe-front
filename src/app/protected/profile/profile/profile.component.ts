import { TranslationService } from './../../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../../../core/services/auth.service';
import { User } from './../../../shared/models/user';
import { Observable, Subscription } from 'rxjs';
import { Profile } from './../../../shared/models/profile';
import { ProfileService } from './../../../core/services/profile.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public profile$: Observable<Profile>;
  public user: User;
  private langSub: Subscription;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private translationService: TranslationService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.profile$ = this.profileService.profile$;
    this.user = this.authService.currentUser;
    this.updateLang();
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }

  private updateLang(): void {
    this.langSub = this.translationService.currentLang$.subscribe(
      lang => this.translate.use(lang)
    )
  }
}
