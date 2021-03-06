import { PictureDisplayingService } from './../../utils/picture-displaying.service';
import { TranslationService } from './../../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../../environments/environment';
import { Picture } from './../../models/picture';
import { ProfileService } from './../../../core/services/profile.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './../../models/user';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MemberProfile } from '../../models/profile';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  public languages = [
    { value: 'en', name: 'English' },
    { value: 'fr', name: 'Français' },
  ];
  public prefix = 'user';
  public profilePath = `${this.prefix}/profile`;
  public userSub: Subscription;
  public user: User;
  public profile: MemberProfile;
  public profileSub: Subscription;
  public assetPath = environment.assetsPath;

  constructor(
    public pictureDisplayingService: PictureDisplayingService,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private translate: TranslateService,
    private translationService: TranslationService,
  ) { }

  get profilePicture(): Picture | null {
    if (this.profile) {
      return this.profile?.profilePictures.filter(picture => picture.isHeadlinePicture)[0] || this.profile?.profilePictures[0];
    }

    return null;
  }

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe(user => this.user = user);
    this.profileSub = this.profileService.profile$.subscribe(profile => this.profile = profile);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.profileSub.unsubscribe();
  }

  public navigate(page: string): void {
    this.router.navigate([page]);
  }

  public useLanguage(language: string): void {
    this.translate.use(language);
    this.translationService.setCurrentLang(language);
  }
}
