import { AuthService } from './../../../core/services/auth.service';
import { ProfileService } from './../../../core/services/profile.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Profile } from './../../../shared/models/profile';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-profile-bio',
  templateUrl: './profile-bio.component.html',
  styleUrls: ['./profile-bio.component.scss']
})
export class ProfileBioComponent implements OnInit {

  @Input() currentUserId: string;
  @Input() profile: Profile;
  public user: User;
  public editBio = false;
  public profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  get bio(): AbstractControl { return this.profileForm.get('bio'); }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.initForm();
  }

  public submit(): void {
    const profile = new Profile(this.profile.id, this.bio.value);
    this.profileService.editBio(profile).subscribe(_ => this.editBio = false);
  }

  private initForm(): void {
    this.profileForm = this.fb.group({
      bio: [this.profile.bio, [
        Validators.required
      ]]
    });
  }

}
