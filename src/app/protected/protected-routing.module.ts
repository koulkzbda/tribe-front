import { AuthGuard } from './../core/guards/auth.guard';
import { ProtectedComponent } from './protected.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    component: ProtectedComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'feedbuzz',
        loadChildren: () => import('./feedbuzz/feedbuzz.module').then(m => m.FeedbuzzModule)
      },
      {
        path: 'welcome',
        loadChildren: () => import('./first-co/first-co.module').then(m => m.FirstCoModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
