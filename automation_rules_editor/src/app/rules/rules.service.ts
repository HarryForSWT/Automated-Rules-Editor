import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  private employees = ['Harry', 'Ron', 'Hermione'];
  private rules = [1,2,3];
  private today: Date = new Date();
  private isNewRule: boolean;
  constructor() {}

  getRandomEmployee(){
    var randomNumber = Math.floor(Math.random()*this.employees.length);
    return this.employees[randomNumber];
  }

  getEditDate(){
    return this.today; 
  }

  getRulelist(){
    return this.rules;
  }

  getIsNewRule(){
    return this.isNewRule;
  }
  setIsNewRuleStatus(v: boolean){
    this.isNewRule= v;
  }
}
