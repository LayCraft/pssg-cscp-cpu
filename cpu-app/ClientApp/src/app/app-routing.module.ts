import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RenewApplicationComponent } from './renew-application/renew-application.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrganizationProfileMakerComponent } from './organization-profile-maker/organization-profile-maker.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'renew-application',
    component: RenewApplicationComponent,
    //canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'profile',
    component: OrganizationProfileMakerComponent,
    //canDeactivate: [CanDeactivateGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
