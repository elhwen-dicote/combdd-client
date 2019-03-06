import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CaracterListComponent } from './components/caracter-list/caracter-list.component';
import { CaracterCreateComponent } from './components/caracter-create/caracter-create.component';
import { TestCaracterFormComponent } from './components/test-caracter-form/test-caracter-form.component';
import { CaracterEditComponent } from './components/caracter-edit/caracter-edit.component';

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
    path: 'test-caracter-form',
    component: TestCaracterFormComponent,
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
