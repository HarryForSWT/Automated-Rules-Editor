import { Injectable } from '@angular/core';
// import rules from '../../assets/rules.json';
import { Rule } from './rule.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  private today: Date = new Date();
  private isNewRule: boolean;
  private rulesData: Rule[] = [];
  private tags = new Set<string>();
  constructor(private http: HttpClient) {
    // modified json: ./assets/modified_rules.json
    // original json: ./assets/rules.json
    this.http.get<any>('./assets/modified_rules.json').subscribe(data => {
      data.forEach(e => {
        let rule: Rule = new Rule(e.id, e.name, e.desc, e.categories, e.created, e.last_edit, e.conditions, e.actions);
        this.rulesData.push(rule);
        rule.categories.forEach(element => {
          this.tags.add(element);
        });
      });
    });
  }

  public getTags() {
    return this.tags;
  }

  getEditDate(){
    return this.today; 
  }

  getRulelist(){
    console.log(this.rulesData);
    return this.rulesData;
  }
  getRuleItem(id: number){
    console.log(this.rulesData[id-1]);
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

  saveRule(id:number, rule: Rule, newRule: boolean){
    if(newRule) {
      rule.id = this.rulesData.length;
      this.rulesData.push(rule);
    } else {
      this.rulesData[rule.id] = rule;
    }
    console.log(this.rulesData);
  }

  deleteRule(ruleIndex: number){
    this.rulesData.splice(ruleIndex,1);
  }

  sendRulesToServer() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log("Sending JSON to Server.");
    console.log(JSON.stringify(this.rulesData));
    this.http.post<any>("/save-json", JSON.stringify(this.rulesData), httpOptions).subscribe(data => {
      console.log(data);
    })
  }
}
