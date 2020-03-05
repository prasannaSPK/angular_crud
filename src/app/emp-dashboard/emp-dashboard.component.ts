import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid'
import { MatTableDataSource, MatSort } from '@angular/material';
// import {MatTableModule} from '@angular/material/table';
import { map } from 'rxjs/operators';
import {EmployeeData} from '../model/employee';
import {EmployeeService} from '../services/employee.service';
import {EmpDetailsComponent} from '../emp-details/emp-details.component';






@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css']
})
export class EmpDashboardComponent implements OnInit {
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  @ViewChild('beginEdit', { static: false }) beginEdit: ElementRef;
    @ViewChild('endEdit', { static: false }) endEdit: ElementRef;
  dataSource:EmployeeData;
  
  errorMessage:string;
  url:string
source=   {
          
  datatype: 'json',
  datafields: [
      { name: 'empid', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'age', type: 'int' },
      { name: 'gender', type: 'string' },
      { name: 'salary', type: 'int' }
  ],
  // root: 'Products',
  // record: 'Product',
  // id: 'ProductID',
  url:'http://localhost:3000/employees'
  
};
  constructor(private _employeeService:EmployeeService) {

    
   }

  ngOnInit() {
    // this.source['url'] =this._employeeService.url
   
  }



  // displayedColumns: string[] = ['empid', 'name', 'age', 'gender','salary'];// these are coloumn id's
  

    

	getWidth() : any {
		if (document.body.offsetWidth < 850) {
			return '90%';
		}
		
		return 850;
	}

    dataAdapter: any = new jqx.dataAdapter(this.source);

    cellsrenderer:any = (row: number): string => {
     
      // console.log(this.dataAdapter.records[row].empid)
        var empid = this.dataAdapter.records[row].empid;
        // return '<a href="http://www.google.com">'+empid+'</a>'
      //  return '<a href="/employeeDetails">'+empid+'</a>'
       return `<a href="/employeeDetails/${empid}">`+empid+'</a>'

      
        
    };

    

    columns: any[] =
    [
        { text: 'Employee Id', columngroup: 'EmployeeDetails', datafield:'empid' , width: 250 ,cellsrenderer:this.cellsrenderer},
        { text: 'Name', columngroup: 'EmployeeDetails', datafield: 'name', cellsalign: 'right', align: 'right' },
        { text: 'Age', columngroup: 'EmployeeDetails', datafield: 'age', align: 'right', cellsalign: 'right', cellsformat: 'n' },
        { text: 'Gender', columngroup: 'EmployeeDetails',datafield: 'gender', columntype: 'dropdownlist',cellsalign: 'right', width: 100 },
        { text: 'Salary', columngroup: 'EmployeeDetails', datafield: 'salary', align: 'center',cellsalign: 'center' ,cellsformat: 'c2'},
        {
           datafield: '    ', columntype: 'button',columngroup: 'EmployeeDetails',
          cellsrenderer: (): string => {

          //  return'<button type="button" class="btn btn-danger">'+'Delete'+'</button>'
              return 'Delete';
          },
          buttonclick: (row: number): void => {
           
            var x = this.dataAdapter.records[row].empid;
            var y = this.dataAdapter.records[row].name;
            confirm("Are you Sure to Delete Entry of : "+y+'?')
            this._employeeService.deleteEmployee(x)
            .subscribe({
              error: err => this.errorMessage = err
              });
              
              window.location.reload();
          }
          }
    ];

    columngroups: any[] =
    [
        { text: 'Employee Details', align: 'center', name: 'EmployeeDetails' }
    ];

    myGridOnCellBeginEdit(event: any): void {
      // console.log(event)
      // console.log(event.args.row)
      let args = event.args;
      this.beginEdit.nativeElement.innerHTML = 'Event Type: cellbeginedit, Column: ' + args.datafield + ', Row: ' + (1 + args.rowindex) + ', Value: ' + args.value;
      // console.log(args+" "+args.value);
      // console.log(args.value.toString())
    
  }
  myGridOnCellEndEdit(event: any): void {
    // console.log(event.args)
    // console.log(event.args.row);
    let id = event.args.row['empid'];
    console.log(id)
    //mapping row elements 
    var rowData =  event.args.row;
    console.log(rowData['name'] +" "+rowData['empid']+" "+rowData['salary'])
    this.dataSource={'name':rowData['name'],'empid':rowData['empid'],'salary':rowData['salary'],'age':rowData['age'],'gender':rowData['gender']};
    
    
    

      this._employeeService.updateEmployee(this.dataSource).subscribe();
      // this.endEdit.nativeElement.innerHTML = 'Event Type: cellendedit, Column: ' + args.datafield + ', Row: ' + (1 + args.rowindex) + ', Value: ' + args.value;
  }

  

}
