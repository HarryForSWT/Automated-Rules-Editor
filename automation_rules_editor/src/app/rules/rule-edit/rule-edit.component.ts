import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RulesService } from '../rules.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Rule } from '../rule.module';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import { Action } from './action.module';
import { Condition } from './condition.module';

@Component({
  selector: 'app-rule-edit',
  templateUrl: './rule-edit.component.html',
  styleUrls: ['./rule-edit.component.scss']
})
export class RuleEditComponent implements OnInit {
  ruleIndex: number;
  signupForm: FormGroup;
  ruleName = "";
  ruleDesc = "";
  ruleData: Rule;
  chosenConditions : Condition[] = [];
  chosenActions: Action[] = [];

  tags: string[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  possibleConditions = [
    new Condition(0, 'existence', false, [], false),
    new Condition(1, 'checkedFilled', false, [], false),
    new Condition(2, 'comparison', false, [], false),
    new Condition(3, 'prefix', false, [], false),
    new Condition(4, 'regex', false, [], false)];

  possibleActions = [
    new Action(0, 'changeValue', [], false),
    new Action(1, 'advancedCalculation', [], false),
    new Action(2, 'warning', [], false),
    new Action(3, 'addAttribute', [], false),
    new Action(4, 'setRegex', [], false)
  ];

  //chosenActions = [new Action(1, 'Change Value', ['revenue', '=', '5000'], true)];

  dropAction(event: CdkDragDrop<Action[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  dropCondition(event: CdkDragDrop<Condition[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
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

      this.ruleData.actions.forEach(a => {
        let action = new Action(0, a[0], a[1], true);
        this.chosenActions.push(action);
      })
    }

    this.signupForm = new FormGroup({
      'ruleName' : new FormControl(null),
      'tags': new FormArray([])
    });

    
  }

  saveAndBack() {
    // if new Rule is created, a new Rule object first must be initialized
    if(this.isNewRule) {
      let now = new Date().toString();
      this.ruleData = new Rule(55, "", "", this.tags, ["Mike", now], ["Mike", now], [], []);
    }
    // bring rules back into JSON format
    this.ruleData.actions = [];
    this.chosenActions.forEach(a => {
      this.ruleData.actions.push([a.name, a.params]);
    })
    
    this.ruleData.name = (<HTMLInputElement>document.getElementById("ruleName")).value;
    this.ruleData.desc = (<HTMLInputElement>document.getElementById("ruleDesc")).value;
    console.log(this.ruleData);
    this.rulesService.saveRule(this.ruleIndex, this.ruleData);
    this.onBacktoRuleList();
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
