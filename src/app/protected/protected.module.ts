import { ProtectedSharedModule } from './protected-shared/protected-shared.module';
import { NgModule } from '@angular/core';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ProtectedComponent } from './protected.component';

@NgModule({
  declarations: [ProtectedComponent],
  imports: [
    ProtectedSharedModule,
    ProtectedRoutingModule,
  ]
})
export class ProtectedModule { }
