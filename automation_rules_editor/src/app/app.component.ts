import { Component } from '@angular/core';
import rules from '../assets/rules.json';
import { Rule } from './rules/rule.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'automation_rules_editor';
  opened = true;
}
