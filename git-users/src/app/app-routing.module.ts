import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReposComponent } from './routes/repos/repos.component';
import { UsersComponent } from './routes/users/users.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/users', pathMatch: 'full',
  },
  {
    path: 'users/:user', redirectTo: '/users/:user/repos', pathMatch: 'full',
  },
  {
    path: 'users', component: UsersComponent
  },
  {
    path: 'users/:user/repos', component: ReposComponent
  },
  {
    path: '**', redirectTo: '/users', pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
