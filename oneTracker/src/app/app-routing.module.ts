import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AddticketComponent } from './components/addticket/addticket.component';
import { DataComponent } from './components/data/data.component';
import { ViewallticketsComponent } from './components/viewalltickets/viewalltickets.component';
import { ViewticketComponent } from './components/viewticket/viewticket.component';
import { EditticketComponent } from './components/editticket/editticket.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, children:[
      { path: 'addticket', component: AddticketComponent },
      { path: 'data', component: DataComponent },
      { path: 'viewalltickets', component: ViewallticketsComponent },
      { path: 'viewticket', component: ViewticketComponent },
      { path: 'editticket', component: EditticketComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
