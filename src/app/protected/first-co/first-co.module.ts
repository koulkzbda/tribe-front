import { ProtectedSharedModule } from './../protected-shared/protected-shared.module';
import { NgModule } from '@angular/core';

import { FirstCoRoutingModule } from './first-co-routing.module';
import { FirstCoComponent } from './first-co.component';
import { DefineIdentityComponent } from './components/define-identity/define-identity.component';
import { DesignSystemComponent } from './components/design-system/design-system.component';
import { FollowSystemComponent } from './components/follow-system/follow-system.component';
import { SeeProgressionComponent } from './components/see-progression/see-progression.component';


@NgModule({
  declarations: [FirstCoComponent, DefineIdentityComponent, DesignSystemComponent, FollowSystemComponent, SeeProgressionComponent],
  imports: [
    ProtectedSharedModule,
    FirstCoRoutingModule
  ]
})
export class FirstCoModule { }
