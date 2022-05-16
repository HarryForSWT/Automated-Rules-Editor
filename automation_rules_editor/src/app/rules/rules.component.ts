import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  ruleNameInput!: string;
  sortVariable: string= 'last edited';
  
  
  constructor() { }

  ngOnInit(): void {
  }

}
