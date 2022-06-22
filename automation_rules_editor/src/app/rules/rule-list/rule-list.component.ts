import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rule } from '../rule.module';
import { RulesService } from '../rules.service';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent implements OnInit {
  rules: Rule[];
  ruleNameInput: string;
  sortVariable: string= 'last edited';
  constructor(
    private rulesService: RulesService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.rules = this.rulesService.getRulelist();
  }

  onCreateRule(){
    this.rulesService.setIsNewRuleStatus(true); 
    this.router.navigate(['new'],{relativeTo: this.route});
  }

  saveRules(){
    this.rulesService.sendRulesToServer();
  }
}
