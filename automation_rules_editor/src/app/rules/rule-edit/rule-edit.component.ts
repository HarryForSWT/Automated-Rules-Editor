import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RulesService } from '../rules.service';

@Component({
  selector: 'app-rule-edit',
  templateUrl: './rule-edit.component.html',
  styleUrls: ['./rule-edit.component.scss']
})
export class RuleEditComponent implements OnInit {
  ruleIndex: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rulesService: RulesService) {}
  title: string;
  isNewRule: boolean;

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) =>{
          this.ruleIndex= +params['id'];
        }
      );
    this.isNewRule = this.rulesService.getIsNewRule();
  }
  onBacktoRuleList(){
    this.router.navigate(['/'],{relativeTo: this.route});
  }
}
