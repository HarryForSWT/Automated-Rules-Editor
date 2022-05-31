import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RulesService } from '../../rules.service';

@Component({
  selector: 'app-rule-item',
  templateUrl: './rule-item.component.html',
  styleUrls: ['./rule-item.component.scss']
})
export class RuleItemComponent implements OnInit {
  @Input('ruleIndex') ruleIndex: number;
  //ruleName: string;
  details:boolean= false;
  employeeCreate: string;
  employeeEdit: String;
  timeNow: Date;
  id: number;
  constructor(
    private rulesService: RulesService,
    private route: ActivatedRoute,
    private router: Router
    ) { }
  ngOnInit(): void {
    this.employeeEdit = this.rulesService.getRandomEmployee();
    this.employeeCreate = this.rulesService.getRandomEmployee();
    this.timeNow = this.rulesService.getEditDate();

    // this.route.params
    //   .subscribe(
    //     (params: Params) =>{
    //       this.ruleName = 'Rule number '+ params['id'];
    //     }
    //   );
  }
  onDetailsShow(){
    this.details=!this.details;
  }
  onRuleEdit(){
    this.id = this.ruleIndex;
    this.router.navigate([this.id,'edit'], {relativeTo:this.route});
  }

}
