import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 
  private baseUrl = 'http://localhost:8080/api/v1/employees';
 
  constructor(private http: HttpClient) {}
 
  getAll() {
    return this.http.get<any[]>(this.baseUrl);
  }
 
  add(employee: any) {
    return this.http.post(this.baseUrl, employee);
  }
 
  update(id: number, employee: any) {
    return this.http.put(`${this.baseUrl}/${id}`, employee);
  }
 
  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  sortBySalary(order:string){
    return this.http.get<any[]>(`${this.baseUrl}/sort?order=${order}`);
  }
}