import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RulesComponent } from './rules/rules.component';
import { RuleListComponent } from './rules/rule-list/rule-list.component';
import { RuleItemComponent } from './rules/rule-list/rule-item/rule-item.component';
import { RuleEditComponent } from './rules/rule-edit/rule-edit.component';
import { NavTreeComponent } from './nav-tree/nav-tree.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RulesComponent,
    RuleListComponent,
    RuleItemComponent,
    RuleEditComponent,
    NavTreeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
