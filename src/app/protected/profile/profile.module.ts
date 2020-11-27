import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule { }
