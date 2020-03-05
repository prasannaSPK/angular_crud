import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatTableModule} from '@angular/material/table';
// import {MatFormFieldModule} from '@angular/material/form-field';

import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
// import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { MatTableModule,MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatOptionModule, MatSelectModule } from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    EmpDashboardComponent,
    EmpDetailsComponent,
    jqxGridComponent,
    // jqxGridModule
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule ,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule
    
    
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
