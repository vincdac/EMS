import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './em-dashboard.model';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './em-dashboard.component.html',
  styleUrls: ['./em-dashboard.component.css']
})
export class EmpDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: Boolean;
  showUpdate !: Boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [''],
      Name: ['', Validators.required],
      Email: ['', [Validators.required,Validators.email]],
      Mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      Salary: ['', Validators.required]
    })
    this.getAllEmployee();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeModelObj.id = this.formValue.value.id;
    this.employeeModelObj.Name = this.formValue.value.Name;
    this.employeeModelObj.Email = this.formValue.value.Email;
    this.employeeModelObj.Mobile = this.formValue.value.Mobile;
    this.employeeModelObj.Salary = this.formValue.value.Salary;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Employee added successfully");
        this.formValue.reset();
        let ref = document.getElementById("cancle");
        ref?.click();
        this.getAllEmployee();
      },
        err => {
          alert("Something went wrong during adding");
        })
  }

  getAllEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      },
        err => {
          alert("Something went wrong during viewing");
        })
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        alert("Employee Deleted")
        this.getAllEmployee();
      },
        err => {
          alert("Something went wrong during deleteing");
        })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['id'].setValue(row.id)
    this.formValue.controls['Name'].setValue(row.Name)
    this.formValue.controls['Email'].setValue(row.Email)
    this.formValue.controls['Mobile'].setValue(row.Mobile)
    this.formValue.controls['Salary'].setValue(row.Salary)
  }

  updateEmployeeDetails() {
    this.employeeModelObj.id = this.formValue.value.id;
    this.employeeModelObj.Name = this.formValue.value.Name;
    this.employeeModelObj.Email = this.formValue.value.Email;
    this.employeeModelObj.Mobile = this.formValue.value.Mobile;
    this.employeeModelObj.Salary = this.formValue.value.Salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(res => {
        alert("Updated Successfully")
        this.formValue.reset();
        let ref = document.getElementById("cancle");
        ref?.click();
        this.getAllEmployee();
      },
        err => {
          alert("Something went wrong during updating");
        })
  }

  get Name() {
    return this.formValue.get('Name');
  }
  get Email() {
    return this.formValue.get('Email');
  }
  get Mobile() {
    return this.formValue.get('Mobile');
  }
  get Salary() {
    return this.formValue.get('Salary');
  } 
}

