import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from "@ngrx/effects";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { reducers, metaReducers, effects } from './store';
import { environment } from '../environments/environment';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CaracterListComponent } from './components/caracter-list/caracter-list.component';
import { CaracterCreateComponent } from './components/caracter-create/caracter-create.component';
import { NumericFieldComponent } from './components/numeric-field/numeric-field.component';
import { CaracterFormComponent } from './components/caracter-form/caracter-form.component';
import { CardLayoutComponent } from './components/card-layout/card-layout.component';
import { CaracterEditComponent } from './components/caracter-edit/caracter-edit.component';
import { GroupCreateComponent } from './components/group-create/group-create.component';
import { CaracterTableComponent } from './components/caracter-table/caracter-table.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupTableComponent } from './components/group-table/group-table.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupEditComponent } from './components/group-edit/group-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    WelcomeComponent,
    CaracterListComponent,
    CaracterCreateComponent,
    NumericFieldComponent,
    CaracterFormComponent,
    CardLayoutComponent,
    CaracterEditComponent,
    GroupCreateComponent,
    CaracterTableComponent,
    GroupListComponent,
    GroupTableComponent,
    GroupFormComponent,
    GroupEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
