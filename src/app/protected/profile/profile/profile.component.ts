import { Observable } from 'rxjs';
import { Profile } from './../../../shared/models/profile';
import { ProfileService } from './../../../core/services/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile$: Observable<Profile>;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profile$ = this.profileService.getProfile();
  }

}
