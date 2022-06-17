import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rule } from '../../rule.module';
import { RulesService } from '../../rules.service';

@Component({
  selector: 'app-rule-item',
  templateUrl: './rule-item.component.html',
  styleUrls: ['./rule-item.component.scss']
})
export class RuleItemComponent implements OnInit {
  @Input('ruleIndex') ruleIndex: number;
  @Input() rule: Rule;
  
  ruleName: string;
  ruleDesc: string;
  details:boolean= false;
  categories: string[] = [];
  //categories: string = " ";
  employeeCreate: string;
  timeCreate: string;
  employeeEdit: String;
  timeEdit: string;
  timeNow: Date;
  id: number;
  constructor(
    private rulesService: RulesService,
    private route: ActivatedRoute,
    private router: Router
    ) { }
  ngOnInit(): void {
    this.employeeEdit = this.rule.last_edit[0];
    this.timeEdit = this.rule.last_edit[1].replace("T", ", ");
    this.employeeCreate = this.rule.created[0];
    this.timeCreate = this.rule.created[1].replace("T", ", ");
    this.timeNow = this.rulesService.getEditDate();
    this.ruleDesc = this.rule.desc;
    this.ruleName = this.rule.name;
    this.categories = this.rule.categories;
    //this.categories = this.rule.categories.join(", ")

    // this.route.params
    //   .subscribe(
    //     (params: Params) =>{
    //       this.rule = 'Rule number '+ params['id'];
    //     }
    //   );
  }
  onDetailsShow(){
    this.details=!this.details;
  }
  onRuleEdit(){
    this.id = this.ruleIndex;
    this.rulesService.setIsNewRuleStatus(false);
    this.router.navigate([this.id,'edit'], {relativeTo:this.route});
  }
  onRuleDelete(){
    this.rulesService.deleteRule(this.rule.id);
  }
}
