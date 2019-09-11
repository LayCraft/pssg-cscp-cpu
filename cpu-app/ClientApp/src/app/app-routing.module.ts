import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RenewApplicationComponent } from './renew-application/renew-application.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrganizationProfilePageComponent } from './pages/organization-profile-page/organization-profile-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: 'renew-application',
    component: RenewApplicationComponent,
    //canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'profile',
    component: OrganizationProfilePageComponent,
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
