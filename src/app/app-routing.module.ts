import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EmpDashboardComponent} from './emp-dashboard/emp-dashboard.component';
import {EmpDetailsComponent} from './emp-details/emp-details.component';


const routes: Routes = [
  { path: 'dashboard', component: EmpDashboardComponent },
  {path:'employeeDetails',component:EmpDetailsComponent},
  {path:'employeeDetails/:empid',component:EmpDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
