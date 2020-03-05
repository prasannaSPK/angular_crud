import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName} from '@angular/forms';
import { NumberValidators } from '../validator/number.validator';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {EmployeeData} from '../model/employee';

import {EmployeeService} from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})

export class EmpDetailsComponent implements OnInit {
  errorMessage:string
  employeeForm:FormGroup;
  empData:EmployeeData;
  // empName:EmployeeData['name']="";
  // empId:EmployeeData['empid']="";
  // empSalary:EmployeeData['salary']=0;
  // empAge:EmployeeData['age']=0;
  // empGender:EmployeeData['gender']="";

  genders = ['M','F','other']
  submitted = false
  btnname='Submit';
  btnclass="btn btn-success btn-lg"

  constructor(private fb:FormBuilder,private _employeeService:EmployeeService, private route: ActivatedRoute,private router:Router ) { }

  ngOnInit():void {
    this.employeeForm = this.fb.group({
      name:['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      empid:['',[Validators.required,
        Validators.minLength(3),
        Validators.maxLength(5)]],
      salary:['',NumberValidators.range(20000,1000000)],
      age:['',NumberValidators.range(23,56 )],
      gender:['',Validators.required]
     
    });

    this.route.paramMap.subscribe(
      params=>{
        const id = params.get('empid');
        console.log("the id is "+id)
        if(id!=null){
          this.btnname="Update"
          this.btnclass="btn btn-info btn-lg"
          this.fetchingEmployee(id)
        }
      }
    )
  }

  


  onSubmit() { 
    
      
    

      if(this.employeeForm.valid){
        if(this.employeeForm.dirty){
          this.submitted = true;
          const p = {...this.empData,...this.employeeForm.value};

          if(this.btnname==="Update"){
            console.log("welcome")
            this._employeeService.updateEmployee(p)
            .subscribe({
              // next:()=>this.afterSubmit(),
              error:err=>this.errorMessage = err
            })

          }
          else{
          this._employeeService.addEmployee(p)
          .subscribe({
            // next:()=>this.afterSubmit(),
            error:err=>this.errorMessage = err
          })
        }
         
        }
      }
      else{
        alert("you are trying to submit an invalid form")
      }
  }

  afterSubmit():void{
    this.employeeForm.reset();
    // alert("super")
    this.router.navigate(['/dashboard']);
    
  }

  fetchingEmployee(empid: string): void {
    this._employeeService.getEmployee(empid)
    .subscribe({
    next: (empData: EmployeeData) => this.bindToForm(empData),
    error: err => this.errorMessage = err
    });
    }

    bindToForm(empdata:EmployeeData):void{
      if(this.employeeForm){
        this.employeeForm.reset();
      }
      this.empData = empdata

      this.employeeForm.patchValue({
        name:this.empData.name,
        empid:this.empData.empid,
        salary:this.empData.salary,
        age:this.empData.age,
        gender:this.empData.gender
      });
    }

}
