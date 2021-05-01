import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { EmailConfirmationRoutingModule } from './email-confirmation-routing.module';
import { EmailConfirmationComponent } from './email-confirmation.component';


@NgModule({
  declarations: [EmailConfirmationComponent],
  imports: [
    SharedModule,
    EmailConfirmationRoutingModule
  ]
})
export class EmailConfirmationModule { }
