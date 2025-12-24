import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './employee';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
 
  employees: any[] = [];
 
  employee = {
    id: null,
    firstName: '',
    lastName: '',
    department: '',
    email: '',
    salary: ''
  };
 
  selectedEmployee: any = null;
 
  constructor(private service: EmployeeService) {}
 
  ngOnInit(): void {
    this.loadEmployees();
  }
 
  loadEmployees() {
    this.service.getAll().subscribe(data => {
      this.employees = data;
    });
  }
 
  saveEmployee() {
    if (this.employee.id) {
      this.service.update(this.employee.id, this.employee)
        .subscribe(() => {
          this.loadEmployees();
          this.resetForm();
        });
    } else {
      this.service.add(this.employee)
        .subscribe(() => {
          this.loadEmployees();
          this.resetForm();
        });
    }
  }
 
  editEmployee(emp: any) {
    this.employee = { ...emp };
  }
 
  viewEmployee(emp: any) {
    this.selectedEmployee = emp;
  }

  sortAsc(){
    this.service.sortBySalary('asc').subscribe(data=>{
      this.employees=data;
    });
  }

  sortDesc(){
    this.service.sortBySalary('desc').subscribe(data=>{
      this.employees=data;
    });
  }
 
  closeView() {
    this.selectedEmployee = null;
  }
 
  deleteEmployee(id: number) {
    this.service.delete(id)
      .subscribe(() => this.loadEmployees());
  }
 
  resetForm() {
    this.employee = {
      id: null,
      firstName: '',
      lastName: '',
      department: '',
      email: '',
      salary: ''
    };
  }
}