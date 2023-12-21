import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material/material.module';
import { ViewticketComponent } from './components/viewticket/viewticket.component';
import { EditticketComponent } from './components/editticket/editticket.component';
import { AddticketComponent } from './components/addticket/addticket.component';
import { DataComponent } from './components/data/data.component';
import { RcaComponent } from './components/rca/rca.component';
import { ViewallticketsComponent } from './components/viewalltickets/viewalltickets.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    ViewticketComponent,
    EditticketComponent,
    AddticketComponent,
    DataComponent,
    RcaComponent,
    ViewallticketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
