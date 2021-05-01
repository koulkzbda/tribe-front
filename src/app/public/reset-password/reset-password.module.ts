import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';


@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    SharedModule,
    ResetPasswordRoutingModule
  ]
})
export class ResetPasswordModule { }
