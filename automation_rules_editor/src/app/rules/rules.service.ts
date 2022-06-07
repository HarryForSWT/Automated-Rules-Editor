import { Injectable } from '@angular/core';
// import rules from '../../assets/rules.json';
import { Rule } from './rule.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  private employees = ['Harry', 'Ron', 'Hermione'];
  private today: Date = new Date();
  private isNewRule: boolean;
  private rulesData: Rule[] = [];
  constructor(private http: HttpClient) {
    this.http.get<any>('http://localhost:4201/json').subscribe(data => {
      data.forEach(e => {
        let rule: Rule = new Rule(e.id, e.name, e.desc, e.categories, e.created, e.last_edit, e.conditions, e.actions);
        this.rulesData.push(rule);
      });
      console.log(this.rulesData);
    });
  }

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
