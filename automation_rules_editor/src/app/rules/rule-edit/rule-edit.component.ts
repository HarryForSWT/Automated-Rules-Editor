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
  chosenConditions: Condition[] = [];
  chosenActions: Action[] = [];
  chosenConditionsMap = new Map<String, Condition[]>();
  deletedConditions: Condition[] = [];
  deletedActions: Action[] = [];

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

  dropCondition(event: CdkDragDrop<Condition[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(event.previousContainer.id == "droplist-possible-conditions") {
        // copy item if it is from the possible conditions
        copyArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      } else {
        // transfer the item if it is moved from one chosen condition list to another
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }
  }

  deleteCondition(event: CdkDragDrop<Condition[]>) {
    transferArrayItem(
      event.previousContainer.data,
      this.deletedConditions,
      event.previousIndex,
      event.currentIndex
    );
  }

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

  deleteAction(event: CdkDragDrop<Action[]>) {
    transferArrayItem(
      event.previousContainer.data,
      this.deletedActions,
      event.previousIndex,
      event.currentIndex
    );
  }


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rulesService: RulesService) {
      this.chosenConditionsMap.set("Block1", [new Condition(0, "existence", false, [], true), new Condition(2, "regex", false, [], true)]);
      this.chosenConditionsMap.set("Block2", [new Condition(5, "prefix", false, [], true)]);
      this.chosenConditionsMap.set("Block3", [new Condition(5, "comparison", false, [], true)]);
      this.chosenConditionsMap.set("Block4", []);
    }
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
    this.rulesService.saveRule(this.ruleIndex, this.ruleData, this.isNewRule);
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
