import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailResolver } from './detail.resolver';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserGridComponent } from './user-grid/user-grid.component';

const routes: Routes = [
  {
    path: 'overview',
    component: UserGridComponent
  },
  {
    path: 'details/:id',
    component: UserDetailComponent,
    resolve: {
      model: DetailResolver
    }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'overview'
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
