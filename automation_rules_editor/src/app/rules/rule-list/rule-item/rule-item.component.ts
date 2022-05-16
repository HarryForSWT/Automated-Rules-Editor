import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rule-item',
  templateUrl: './rule-item.component.html',
  styleUrls: ['./rule-item.component.scss']
})
export class RuleItemComponent implements OnInit {
  @Input('ruleIndex') ruleIndex!: number;
  details:boolean= false;
  constructor() { }

  ngOnInit(): void {
  }
  onDetailsShow(){
    this.details=!this.details;
  }

}
