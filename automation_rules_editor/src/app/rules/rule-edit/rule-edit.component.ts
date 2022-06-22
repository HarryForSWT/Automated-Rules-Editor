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
import { ConditionNode } from './conditionNode.module';

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
  conditionsStringArray: String[] = [];
  chosenActions: Action[] = [];
  chosenConditionsMap = new Map<String, Condition[]>();
  conditionsRootNode: ConditionNode = new ConditionNode([], []);
  deletedConditions: Condition[] = [];
  deletedActions: Action[] = [];

  tags: string[] = [];
  

  possibleConditions = [
    new Condition(0, 'existence', false, [], false),
    new Condition(1, 'checkedFilled', false, [], false),
    new Condition(2, 'comparison', false, [], false),
    new Condition(3, 'prefix', false, [], false),
    new Condition(4, 'regex', false, [], false),
    new Condition(5, 'checkMultiple', false, [], false),
    new Condition(6, 'checkContains', false, [], false)];

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

      // Get chosen action from ruleData
      this.ruleData.actions.forEach(a => {
        let action = new Action(0, a[0], a[1], true);
        this.chosenActions.push(action);
      })

      this.conditionsRootNode = this.parseConditions(this.ruleData.conditions, this.conditionsRootNode);

      this.chosenConditionsMap.set("Block1", [new Condition(0, "existence", false, [], true), new Condition(2, "regex", false, [], true)]);
      this.chosenConditionsMap.set("Block2", [new Condition(5, "prefix", false, [], true)]);
      this.chosenConditionsMap.set("Block3", []);
      this.chosenConditionsMap.set("Block4", []);
      this.chosenConditionsMap.set("Block5", [new Condition(5, "checkContains", false, [], true)]);
      this.chosenConditionsMap.set("Block6", []);
      this.chosenConditionsMap.set("Block7", []);

    }

    this.signupForm = new FormGroup({
      'ruleName' : new FormControl(null),
      'tags': new FormArray([])
    });
  }

  parseConditions (conditionData: any[], conditionNode: ConditionNode): ConditionNode {
    if(conditionData.length > 0) {
      if((conditionData[0] != "OR") && (conditionData[0] != "AND")) {
        let condition = new Condition(1, conditionData[0][0], conditionData[0][1], conditionData[0][2], true);
        conditionNode.addCondition(condition);
      } else {
        if (conditionData[0] == "AND") {
          for (let i = 1; i < conditionData.length; i++) {
            if(conditionData[i][0] == "OR") {
              for (let j = 1; j < conditionData[i].length; j++) {
                conditionNode.addChild(this.parseConditions([conditionData[i][j]], new ConditionNode([], [])));
              }
            } else {
              conditionNode.addCondition(new Condition(1, conditionData[i][0], conditionData[i][1], conditionData[i][2], true));
            }
          }
        }
        if (conditionData[0] == "OR") {
          for (let i = 1; i < conditionData.length; i++) {
            conditionNode.addChild(this.parseConditions(conditionData[i], new ConditionNode([], [])));
          }
        }
      }
    }
    return conditionNode;
  }

  saveConditions(conditionNode: ConditionNode) {
    let array:any[] = [];
    if(conditionNode.conditions.length == 1 && conditionNode.children.length == 0) {
      array.push(conditionNode.conditions[0].getStringRepresentation());
    }
    else {
      if (conditionNode.conditions.length > 0) {
        array.push("AND");
      for (let i = 0; i < conditionNode.conditions.length; i++) {
        array.push(conditionNode.conditions[i].getStringRepresentation());
      }
      }
      
      if(conditionNode.children.length > 0) {
        array.push("OR");
        for (let i = 0; i < conditionNode.children.length; i++) {
          array.push(this.saveConditions(conditionNode.children[i]));
        }
      }
    }
    return array;
  }

  saveAndBack() {
    // if new Rule is created, a new Rule object first must be initialized
    let nowDate = new Date();
    let offset = nowDate.getTimezoneOffset();
    nowDate = new Date(nowDate.getTime() - (offset*60*1000));
    let nowString = nowDate.toISOString().slice(0, 16);

    if(this.isNewRule) {
      this.ruleData = new Rule(55, "", "", this.tags, ["Mike", nowString], ["Mike", nowString], [], []);
    }
    // bring rules back into JSON format
    this.ruleData.last_edit = ["Jan", nowString];
    this.ruleData.actions = [];
    this.chosenActions.forEach(a => {
      this.ruleData.actions.push([a.name, a.params]);
    })

    this.conditionsStringArray = this.saveConditions(this.conditionsRootNode);
    console.log(this.conditionsStringArray);
    this.ruleData.conditions = this.conditionsStringArray;
    
    this.ruleData.name = (<HTMLInputElement>document.getElementById("ruleName")).value;
    this.ruleData.desc = (<HTMLInputElement>document.getElementById("ruleDesc")).value;
    console.log(this.ruleData);
    
    this.rulesService.saveRule(this.ruleIndex, this.ruleData, this.isNewRule);
    this.onBacktoRuleList();
  }

  onBacktoRuleList(){
    this.router.navigate(['/'],{relativeTo: this.route});
  }

  
  //for the Angular material chips
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(' '+value);
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

  getGridAreasNode(node: ConditionNode) {
    let nodeRow = '"chosen_and';
    
    for (let i = 1; i < node.children.length; i++) {
      nodeRow = nodeRow.concat(" chosen_and");
    }
    nodeRow = nodeRow.concat('"');
    return nodeRow;
  }

  getGridAreasChildren(node: ConditionNode) {
    var childrenRowArray = [];
    childrenRowArray.push('"')
    for (let i = 0; i < node.children.length; i++) {
      childrenRowArray.push(`chosen_or_${i}`);
    }
    childrenRowArray.push('"')
    if (node.children.length != 0) {
      return childrenRowArray.join(" ");
    }
    return "";
  }

 
}
