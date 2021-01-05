import { AuthService } from './../../../core/services/auth.service';
import { User } from './../../../shared/models/user';
import { Observable } from 'rxjs';
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

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.profile$ = this.profileService.profile$;
    this.user = this.authService.currentUser;
  }

  ngOnDestroy(): void {
  }
}
