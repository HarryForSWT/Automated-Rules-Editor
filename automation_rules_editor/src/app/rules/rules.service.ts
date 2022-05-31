import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  employees = ['Harry', 'Ron', 'Hermione'];
  today: Date = new Date();
  constructor() {}

  getRandomEmployee(){
    var randomNumber = Math.floor(Math.random()*this.employees.length);
    return this.employees[randomNumber];
  }

  getEditDate(){
    return this.today; 
  }
}
