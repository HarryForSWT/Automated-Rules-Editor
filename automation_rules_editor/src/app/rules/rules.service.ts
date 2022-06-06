import { Injectable } from '@angular/core';
import rules from '../../assets/rules.json';
import { Rule } from './rule.module';
@Injectable({
  providedIn: 'root'
})
export class RulesService {
  private employees = ['Harry', 'Ron', 'Hermione'];
  private today: Date = new Date();
  private isNewRule: boolean;
  private rulesData: Rule[] = rules;
  constructor() {}

  getRandomEmployee(){
    var randomNumber = Math.floor(Math.random()*this.employees.length);
    return this.employees[randomNumber];
  }

  getEditDate(){
    return this.today; 
  }

  getRulelist(){
    return this.rulesData;
  }
  getRuleItem(id: number){
    return this.rulesData[id-1];

    /*
     const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    return server; */
  }

  getIsNewRule(){
    return this.isNewRule;
  }
  setIsNewRuleStatus(v: boolean){
    this.isNewRule= v;
  }
  
}
