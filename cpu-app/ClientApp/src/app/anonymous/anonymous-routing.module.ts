import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousFormComponent } from './anonymous-form/anonymous-form.component';
import { AnonymousComponent } from './anonymous.component';

const routes: Routes = [
  {
    path: '',
    component: AnonymousComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'anonymous-form',
      },
      {
        path: 'anonymous-form',
        component: AnonymousFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnonymousRoutingModule { }
