import { ProfileService } from './../../../core/services/profile.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Profile } from './../../../shared/models/profile';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-bio',
  templateUrl: './profile-bio.component.html',
  styleUrls: ['./profile-bio.component.scss']
})
export class ProfileBioComponent implements OnInit {

  @Input() profile: Profile;
  public editBio = false;
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) { }

  get bio(): AbstractControl { return this.profileForm.get('bio'); }

  ngOnInit(): void {
    this.initForm();
  }

  public submit(): void {
    const profile = new Profile(this.profile.id, this.bio.value);
    this.profileService.editBio(profile).subscribe(profile => { console.log(profile); this.editBio = false; });
  }

  private initForm(): void {
    this.profileForm = this.fb.group({
      bio: [this.profile.bio, [
        Validators.required
      ]]
    });
  }

}
