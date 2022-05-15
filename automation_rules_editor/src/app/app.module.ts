import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NaviComponent } from './navi/navi.component';
import { RulesComponent } from './rules/rules.component';
import { RuleListComponent } from './rules/rule-list/rule-list.component';
import { RuleItemComponent } from './rules/rule-list/rule-item/rule-item.component';
import { RuleEditComponent } from './rules/rule-edit/rule-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NaviComponent,
    RulesComponent,
    RuleListComponent,
    RuleItemComponent,
    RuleEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
