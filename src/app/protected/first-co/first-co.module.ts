import { ProtectedSharedModule } from './../protected-shared/protected-shared.module';
import { NgModule } from '@angular/core';

import { FirstCoRoutingModule } from './first-co-routing.module';
import { FirstCoComponent } from './first-co.component';
import { DefineIdentityComponent } from './components/define-identity/define-identity.component';
import { DesignSystemComponent } from './components/design-system/design-system.component';


@NgModule({
  declarations: [FirstCoComponent, DefineIdentityComponent, DesignSystemComponent],
  imports: [
    ProtectedSharedModule,
    FirstCoRoutingModule
  ]
})
export class FirstCoModule { }
