import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rule-edit',
  templateUrl: './rule-edit.component.html',
  styleUrls: ['./rule-edit.component.scss']
})
export class RuleEditComponent implements OnInit {
  @Input('ruleIndex') ruleIndex: number;
  constructor(private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
  }
  onBacktoRuleList(){
    this.router.navigate(['/'],{relativeTo: this.route});
  }

}
