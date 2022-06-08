import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RulesService } from '../rules.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Rule } from '../rule.module';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Action } from './action.module';

@Component({
  selector: 'app-rule-edit',
  templateUrl: './rule-edit.component.html',
  styleUrls: ['./rule-edit.component.scss']
})
export class RuleEditComponent implements OnInit {
  ruleIndex: number;
  signupForm: FormGroup;
  ruleNameDesc='';
  ruleName = "";
  ruleDesc = "";
  ruleData: Rule;

  tags: string[];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  possibleActions = [
    new Action(0, 'Change Value', null, false),
    new Action(1, 'Set Value', null, false),
    new Action(2, 'Advanced Calculation', null, false),
    new Action(3, 'Warning', null, false),
    new Action(4, 'Add Attribute', null, false),
    new Action(5, 'Apply Regex', null, false)
  ];

  chosenActions = [new Action(1, 'Set Value', ['revenue', '5000'], true)];

  drop(event: CdkDragDrop<Action[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

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

    if(!this.isNewRule) {
      this.ruleData = this.rulesService.getRuleItem(this.ruleIndex);
      this.tags = this.ruleData.categories;
      this.ruleName = this.ruleData.name;
      this.ruleDesc = this.ruleData.desc;
    }

    this.signupForm = new FormGroup({
      'ruleName' : new FormControl(null),
      'tags': new FormArray([])
    });
  }

  onBacktoRuleList(){
    this.router.navigate(['/'],{relativeTo: this.route});
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

 
}
