import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent implements OnInit {
  rules= [1,2,3];
  constructor() { }

  ngOnInit(): void {
  }

}