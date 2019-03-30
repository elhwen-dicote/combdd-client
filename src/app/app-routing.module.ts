import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CaracterListComponent } from './components/caracter-list/caracter-list.component';
import { CaracterCreateComponent } from './components/caracter-create/caracter-create.component';
import { CaracterEditComponent } from './components/caracter-edit/caracter-edit.component';
import { GroupCreateComponent } from './components/group-create/group-create.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupEditComponent } from './components/group-edit/group-edit.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
  }, {
    path: 'caracter-list',
    component: CaracterListComponent,
  }, {
    path: 'caracter-create',
    component: CaracterCreateComponent,
  }, {
    path: 'caracter-edit/:id',
    component: CaracterEditComponent,
  }, {
    path: 'group-list',
    component: GroupListComponent,
  }, {
    path: 'group-create',
    component: GroupCreateComponent,
  }, {
    path: 'group-edit/:id',
    component: GroupEditComponent,
  }, {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
